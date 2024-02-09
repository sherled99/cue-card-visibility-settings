import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import { TranslateByLocale } from '../services/translate-by-locate.service';
import { DTO_Chat } from '../models/DTO_Chat';


@Component({
  selector: 'app-angular-chat-header',
  templateUrl: './angular-chat-header.component.html',
  styleUrls: ['./angular-chat-header.component.scss'],
})
export class AngularChatHeaderComponent implements AfterViewInit, OnDestroy {
  constructor(public translateRecord: TranslateByLocale) {}

  @Input()
  terrasoft: any;

  @Input()
  sandbox: any;

  @Input()
  serviceHelper: any;

  @Input()
  locale: any;
  
  @Input()
  chat: DTO_Chat = new DTO_Chat();

  @Input()
  chatRelatedLinks: any;

  @Output()
  backToListChat = new EventEmitter();

  @Output()
  cardClick = new EventEmitter<any>();

  ngAfterViewInit(): void {
    window.onbeforeunload = this.onBeforeUnload;
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  onBeforeUnload(e: any) {
    var e = e || window.event;
  }

  backToAllList() {
    this.backToListChat.emit(null);
  }
  
  onChangeOperatorClick() {
    const lookupConfig = {
      entitySchemaName: "Contact",
      multiSelect: false,
      columns: ["Id", "Name"],
      actionsButtonVisible: false,
      filters: this.getOwnerFilterWithActive()
    };
    const config = {
      "lookupConfig": lookupConfig,
      "sandbox": this.sandbox,
      "keepAlive": false
    };
    this.terrasoft.LookupUtilities.open(config, (e:any) => {
      let contact = e.selectedRows.collection.items[0];
      this.serviceHelper.callService({
        serviceName: "GoChatService",
        methodName: "ChangeChatOwner",
        data: {
          chatId: this.chat.chat.id,
          contactId: contact.Id
        },
        callback: this.onOperatorChanged.bind(this, contact),
        scope: this
			});
    }, this);
  }

  onOperatorChanged(contact: any, result: any) {
    if (result && result.success) {
      this.backToAllList();
      console.log(contact);
      console.log(result);
      this.terrasoft.utils.showInformation(this.translateRecord.getTranslateWord(this.locale, 'changeoperatorsuccess'));
    } else {
      console.log(result);
      this.terrasoft.utils.showInformation(result?.error);
    }
  }

  getOwnerFilterWithActive() {
    let filters = this.terrasoft.createFilterGroup();
    filters.addItem(this.terrasoft.createColumnFilterWithParameter(this.terrasoft.ComparisonType.EQUAL, "[SysAdminUnit:Contact].Active", true));

    return filters;
  }

  onOpenCard(eventData: any) {
    this.cardClick.emit(eventData);
  }
}
