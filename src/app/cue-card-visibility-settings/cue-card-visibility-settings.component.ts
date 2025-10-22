import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cue-card-visibility-settings",
  templateUrl: "./cue-card-visibility-settings.component.html",
  styleUrls: ["./cue-card-visibility-settings.component.scss"],
})
export class CueCardVisibilitySettingsComponent implements OnInit {
  @Input() serviceHelper: any;
  @Input() cueCardId: string = "";

  // Available data
  availableAgents: Agent[] = [];
  availableQueues: Queue[] = [];
  
  // Selected data in unified format
  selectedFilters: FilterItem[] = [];
  
  // Selection values
  selectedAgentId = "";
  selectedQueueId = "";

  // Loading states
  isLoadingAgents = false;
  isLoadingQueues = false;
  errorMessage = "";

  ngOnInit(): void {
    this.loadAgents();
    this.loadQueues();
    this.loadVisibilityRules();
  }

  /**
   * Loads agents from API
   */
  loadAgents(): void {
    this.isLoadingAgents = true;
    this.errorMessage = "";

    const config = this.createServiceConfig("GetUsers", {}, (res: any) => {
      this.isLoadingAgents = false;
      
      if (res?.GetUsersResult?.success && res.GetUsersResult.users) {
        this.availableAgents = res.GetUsersResult.users.map((user: any) => ({
          id: user.ContactId,
          name: user.Name
        }));
        console.log("Agents loaded successfully:", this.availableAgents.length);
      } else {
        this.errorMessage = res?.GetUsersResult?.error_message || "Failed to load agents";
        console.error("Failed to load agents:", this.errorMessage);
      }
    });

    if (this.serviceHelper) {
      this.serviceHelper.callService(config);
    } else {
      console.warn("ServiceHelper not available, using static data");
    }
  }

  /**
   * Loads queues from API
   */
  loadQueues(): void {
    this.isLoadingQueues = true;
    this.errorMessage = "";

    const config = this.createServiceConfig("GetQueues", {}, (res: any) => {
      this.isLoadingQueues = false;
      
      if (res?.GetQueuesResult?.success && res.GetQueuesResult.queues) {
        this.availableQueues = res.GetQueuesResult.queues.map((queue: any) => ({
          id: queue.queue_id,
          name: queue.name
        }));
        console.log("Queues loaded successfully:", this.availableQueues.length);
      } else {
        this.errorMessage = res?.GetQueuesResult?.error_message || "Failed to load queues";
        console.error("Failed to load queues:", this.errorMessage);
      }
    });

    if (this.serviceHelper) {
      this.serviceHelper.callService(config);
    } else {
      console.warn("ServiceHelper not available, using static data");
    }
  }

  /**
   * Loads existing visibility rules from API
   */
  loadVisibilityRules(): void {
    if (!this.cueCardId) {
      console.warn("cueCardId is not provided, cannot load visibility rules");
      return;
    }

    this.errorMessage = "";

    const config = this.createServiceConfig("GetVisibilityRules", {
      cueCardId: this.cueCardId
    }, (res: any) => {
      if (res?.GetVisibilityRulesResult && Array.isArray(res.GetVisibilityRulesResult)) {
        this.selectedFilters = res.GetVisibilityRulesResult.map((rule: any) => ({
          type: rule.type,
          value: rule.value,
          displayName: rule.name
        }));
        
        console.log("Visibility rules loaded successfully:", this.selectedFilters);
      } else {
        console.error("Failed to load visibility rules:", res);
      }
    });

    if (this.serviceHelper) {
      this.serviceHelper.callService(config);
    } else {
      console.warn("ServiceHelper not available, cannot load visibility rules");
    }
  }

  /**
   * Handles agent selection
   */
  onAgentSelect(): void {
    if (this.selectedAgentId) {
      const agent = this.availableAgents.find(a => a.id === this.selectedAgentId);
      if (agent && !this.selectedFilters.some(f => f.type === "agent" && f.value === agent.id)) {
        this.selectedFilters.push({
          type: "agent",
          value: agent.id,
          displayName: agent.name
        });
        
        console.log("Agent selected:", agent.name);
        console.log("Current filters array:", this.selectedFilters);
        
        // Send updated rules to API
        this.updateVisibilityRules();
        
        // Small delay for correct select reset
        setTimeout(() => {
          this.selectedAgentId = ""; // Reset select to placeholder
        }, 10);
      }
    }
  }

  /**
   * Handles queue selection
   */
  onQueueSelect(): void {
    if (this.selectedQueueId) {
      const queue = this.availableQueues.find(q => q.id === this.selectedQueueId);
      if (queue && !this.selectedFilters.some(f => f.type === "queue" && f.value === queue.name)) {
        this.selectedFilters.push({
          type: "queue",
          value: queue.name,
          displayName: queue.name
        });
        
        console.log("Queue selected:", queue.name);
        console.log("Current filters array:", this.selectedFilters);
        
        // Send updated rules to API
        this.updateVisibilityRules();
        
        // Small delay for correct select reset
        setTimeout(() => {
          this.selectedQueueId = ""; // Reset select to placeholder
        }, 10);
      }
    }
  }

  /**
   * Removes a filter
   */
  removeFilter(index: number): void {
    const removedFilter = this.selectedFilters[index];
    this.selectedFilters.splice(index, 1);
    
    console.log("Filter removed:", removedFilter);
    console.log("Current filters array:", this.selectedFilters);
    
    // Send updated rules to API
    this.updateVisibilityRules();
  }

  /**
   * Gets filter data in API format
   */
  getSelectedFiltersForApi(): {type: string, value: string}[] {
    return this.selectedFilters.map(filter => ({
      type: filter.type,
      value: filter.value
    }));
  }

  /**
   * Gets selected agents for display
   */
  get selectedAgents(): FilterItem[] {
    return this.selectedFilters.filter(f => f.type === "agent");
  }

  /**
   * Gets selected queues for display
   */
  get selectedQueues(): FilterItem[] {
    return this.selectedFilters.filter(f => f.type === "queue");
  }

  /**
   * Sets default filters (for loading from API)
   */
  setDefaultFilters(filters: FilterItem[]): void {
    this.selectedFilters = [];
    
    filters.forEach(filter => {
      let displayName = "";
      
      if (filter.type === "agent") {
        const agent = this.availableAgents.find(a => a.id === filter.value);
        displayName = agent ? agent.name : filter.value;
      } else if (filter.type === "queue") {
        const queue = this.availableQueues.find(q => q.id === filter.value);
        displayName = queue ? queue.name : filter.value;
      }
      
      this.selectedFilters.push({
        type: filter.type,
        value: filter.value,
        displayName: displayName
      });
    });
  }

  /**
   * Clears all filters
   */
  clearAllFilters(): void {
    this.selectedFilters = [];
    
    console.log("All filters cleared");
    console.log("Current filters array:", this.selectedFilters);
    
    // Send updated rules to API
    this.updateVisibilityRules();
  }

  /**
   * Clears only agent filters
   */
  clearAgentFilters(): void {
    const agentsRemoved = this.selectedFilters.filter(f => f.type === "agent");
    this.selectedFilters = this.selectedFilters.filter(f => f.type !== "agent");
    
    console.log("Agent filters cleared:", agentsRemoved);
    console.log("Current filters array:", this.selectedFilters);
    
    // Send updated rules to API
    this.updateVisibilityRules();
  }

  /**
   * Clears only queue filters
   */
  clearQueueFilters(): void {
    const queuesRemoved = this.selectedFilters.filter(f => f.type === "queue");
    this.selectedFilters = this.selectedFilters.filter(f => f.type !== "queue");
    
    console.log("Queue filters cleared:", queuesRemoved);
    console.log("Current filters array:", this.selectedFilters);
    
    // Send updated rules to API
    this.updateVisibilityRules();
  }

  /**
   * Sends updated visibility rules to API
   */
  private updateVisibilityRules(): void {
    if (!this.cueCardId) {
      console.warn("cueCardId is not provided, cannot update visibility rules");
      return;
    }

    const visibilityRules = this.selectedFilters.map(filter => ({
      type: filter.type,
      value: filter.value
    }));

    console.log("Updating visibility rules with array:", visibilityRules);

    const config = this.createServiceConfig("UpdateCueCardVisibilityRules", {
      cueCardId: this.cueCardId,
      visibilityRules: visibilityRules
    }, (res: any) => {
      if (res?.UpdateCueCardVisibilityRulesResult?.success) {
        console.log("Visibility rules updated successfully");
      } else {
        console.error("Failed to update visibility rules:", res?.UpdateCueCardVisibilityRulesResult?.error_message);
      }
    });

    if (this.serviceHelper) {
      this.serviceHelper.callService(config);
    } else {
      console.warn("ServiceHelper not available, cannot update visibility rules");
    }
  }

  /**
   * Creates service configuration for API calls
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
}

interface Agent {
  id: string;
  name: string;
}

interface Queue {
  id: string;
  name: string;
}

interface FilterItem {
  type: "agent" | "queue";
  value: string;
  displayName: string;
}

interface UserApiData {
  ContactId: string;
  Name: string;
}

interface QueueApiData {
  queue_id: string;
  name: string;
}