import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "cuecard-trigger",
  templateUrl: "./angular-trigger-list.component.html",
  styleUrls: ["./angular-trigger-list.component.scss"],
})
export class CuecardTriggerComponent implements OnInit {
  @Input() baseUrl = "";
  @Input() cueCardId: any;
  @Input() serviceHelper: any;

  @ViewChild("newSynonymInput") newSynonymInput!: ElementRef;

  triggersWithSynonyms: Trigger[] = [];
  newTriggerName = "";
  isLoading = false;
  errorMsg = "";

  ngOnInit(): void {
    this.getData();
  }

  /**
   * Fetches the triggers and their synonyms from the backend.
   */
  getData(): void {
    const config = this.createServiceConfig("GetTriggersTable", { cueCardId: this.cueCardId }, (res: any) => {
      if (Array.isArray(res.GetTriggersTableResult)) {
        this.triggersWithSynonyms = res.GetTriggersTableResult.map(this.mapTrigger);
      } else {
        console.error("Unexpected response format", res);
      }
    });
    this.serviceHelper?.callService(config);
  }

  /**
   * Adds a new trigger if it doesn't already exist.
   */
  addTrigger(): void {
    const newTriggerTitle = this.newTriggerName.trim();
    if (newTriggerTitle) {
      const config = this.createServiceConfig("CreateTrigger", { cueCardId: this.cueCardId, triggerName: newTriggerTitle }, (res: any) => {
        const result = res?.CreateTriggerResult;
        if (result?.Id) {
          const existingTrigger = this.findTriggerById(result.Id);
          if (existingTrigger) {
            // Add synonyms to the existing trigger
            result.Synonyms?.forEach((synonym: any) => {
              if (!existingTrigger.synonyms.some(s => s.id === synonym.Id)) {
                existingTrigger.synonyms.push({ id: synonym.Id, name: synonym.Text });
              }
            });
          } else {
            // Create a new trigger with synonyms
            const newTrigger = this.createTrigger(result.Text, result.Id);
            newTrigger.synonyms = result.Synonyms?.map((synonym: any) => ({ id: synonym.Id, name: synonym.Text })) || [];
            this.triggersWithSynonyms.push(newTrigger);
          }
          this.newTriggerName = "";
        } else {
          console.error("Failed to create trigger", res);
        }
      });
      this.serviceHelper?.callService(config);
    }
  }

  /**
   * Removes a trigger by its ID.
   */
  removeTrigger(triggerId: string): void {
    const config = this.createServiceConfig("DeleteTrigger", { cueCardId: this.cueCardId, triggerId }, (res: any) => {
      if (res?.DeleteTriggerResult?.success) {
        this.triggersWithSynonyms = this.triggersWithSynonyms.filter(trigger => trigger.id !== triggerId);
      } else {
        console.error("Failed to delete trigger", res);
      }
    });
    this.serviceHelper?.callService(config);
  }

  /**
   * Adds a synonym to a specific trigger.
   */
  addSynonym(triggerId: string, synonymName: string): void {
    const trigger = this.findTriggerById(triggerId);
    if (!trigger) {
        console.error(`Trigger with ID ${triggerId} not found.`);
        return;
    }

    if (!synonymName.trim()) {
        console.error("Synonym name is empty.");
        return;
    }

    const config = this.createServiceConfig("AddSynonym", { triggerId, synonymText: synonymName.trim() }, (res: any) => {
        if (res?.AddSynonymResult?.Id) {
            const newSynonym = { id: res.AddSynonymResult.Id, name: synonymName.trim() };

            // Check if the synonym already exists
            if (!trigger.synonyms.some(s => s.id === newSynonym.id)) {
                trigger.synonyms = [...trigger.synonyms, newSynonym]; // Ensure Angular detects the change
                console.log(`Synonym added:`, newSynonym);
            } else {
                console.warn(`Synonym with ID ${newSynonym.id} already exists.`);
            }

            trigger.newSynonym = "";
        } else {
            console.error("Failed to add synonym", res);
        }
    });

    this.serviceHelper?.callService(config);
  }

  /**
   * Removes a synonym from a specific trigger.
   */
  removeSynonym(triggerId: string, synonymId: string): void {
    const trigger = this.findTriggerById(triggerId);
    if (trigger) {
      const config = this.createServiceConfig("RemoveSynonym", { synonymId }, (res: any) => {
        if (res?.RemoveSynonymResult?.success) {
          trigger.synonyms = trigger.synonyms.filter(synonym => synonym.id !== synonymId);
        } else {
          console.error("Failed to remove synonym", res);
        }
      });
      this.serviceHelper?.callService(config);
    }
  }

  /**
   * Handles the Enter key press for adding a trigger.
   */
  onTriggerInputEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") this.addTrigger();
  }

  /**
   * Handles the Enter key press for adding a synonym.
   */
  onSynonymInputEnter(event: KeyboardEvent, triggerId: string, synonymName: string): void {
    if (event.key === "Enter") this.addSynonym(triggerId, synonymName);
  }

  /**
   * Focuses the input for adding a new synonym.
   */
  focusNewSynonymInput(): void {
    this.newSynonymInput?.nativeElement.focus();
  }

  /**
   * Focuses a specific input element.
   */
  focusInput(inputElement: HTMLInputElement): void {
    setTimeout(() => inputElement.focus(), 0);
  }

  /**
   * Creates a configuration object for service calls.
   */
  private createServiceConfig(methodName: string, data: any, callback: (res: any) => void): any {
    return {
      serviceName: "VvtCueCardService",
      methodName,
      callback,
      scope: this,
      data,
    };
  }

  /**
   * Maps a raw trigger object to a Trigger interface.
   */
  private mapTrigger(item: any): Trigger {
    return {
      id: item.Id,
      title: item.Text,
      synonyms: Array.isArray(item.Synonyms) ? item.Synonyms.map((synonym: any) => ({ id: synonym.Id, name: synonym.Text })) : [],
      note: "",
      newSynonym: "",
      newSynonymConfirmed: false,
    };
  }

  /**
   * Creates a new Trigger object.
   */
  private createTrigger(title: string, id: string): Trigger {
    return { id, title, synonyms: [], note: "", newSynonym: "", newSynonymConfirmed: false };
  }

  /**
   * Finds a trigger by its ID.
   */
  private findTriggerById(triggerId: string): Trigger | undefined {
    return this.triggersWithSynonyms.find(trigger => trigger.id === triggerId);
  }

  /**
   * Checks if a trigger with the given title already exists.
   */
  private isDuplicateTrigger(title: string): boolean {
    return this.triggersWithSynonyms.some(trigger => trigger.title === title);
  }
}

interface Trigger {
  id: string;
  title: string;
  synonyms: Synonym[];
  note: string;
  newSynonym: string;
  newSynonymConfirmed: boolean;
}

interface Synonym {
  id: string;
  name: string;
}
