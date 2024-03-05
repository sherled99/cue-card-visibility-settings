import { Component, ViewChild, NgZone, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AngularChatFooterComponent } from '../angular-chat-footer/angular-chat-footer.component';
import { DTO_ChatList } from '../models/DTO_ChatList';
import { DTO_Chat } from '../models/DTO_Chat';
import { DTO_Message } from '../models/DTO_Message';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-angular-chat',
  templateUrl: './angular-chat.component.html',
  styleUrls: ['./angular-chat.component.scss']
})
export class AngularChatComponent {
  constructor(public zone: NgZone, private cd: ChangeDetectorRef) {}

  selectedChatId: string = "";

  @ViewChild(AngularChatFooterComponent)
  ChatFooter!: any ;

  @Input()
  isShowChatList = true;

  @Input()
  serviceHelper: any;

  @Input()
  ownerId: any;

  @Input()
  locale: string = "";

  @Input()
  isGoAngularChatSelected: any;

  @Input()
  terrasoft: any;

  @Input()
  sandbox: any;

  @Input()
  chatList: DTO_ChatList[] = [];

  @Input()
  chat: DTO_Chat = new DTO_Chat();

  @Input()
  lastNewIncomeMessageId: any;

  @Input()
  rowSpanHeader: number = 1;

  @Input()
  rowSpanMessages: number = 18;

  @Input()
  rowSpanFooter: number = 1;

  @Input()
  chatRelatedLinks: any;

  @Input()
  public set openChat(chat: DTO_Chat) {
    console.log('openChat: ', chat);
    this.selectedChatId = chat && chat.chat && chat.chat.id;
    this.chat = chat;
    this.isShowChatList = false;
    this.readIncomeMessages();
  }

  @Input()
  public set newIncomeMessage(message: any) {
    if(this.lastNewIncomeMessageId == message.id) {
      return;
    }
    this.lastNewIncomeMessageId = message.id;

    if((this.isShowChatList || !this.isGoAngularChatSelected)) {
      if(this.chatList.find((el: any) => el.id === message.chatId)) {
        this.browserNotification(message);
      }
    } 

    if(this.chat?.chat?.id === message.chatId) {
      let existedMessage = this.chat.messages.find((el: any) => el.id === message.id);

      if(existedMessage) {
        this.chat.messages[this.chat.messages.indexOf(existedMessage)].text = message.text;
      } else {
        let newMsg: DTO_Message = {
          success: true,
          error: "",
          type: message.type,
          unixDate: message.unixDate,
          text: message.text,
          send_type: 'inbound',
          status: 'new',
          id: message.id,
          date: "",
          isSkipUTC: false,
          config: message.config,
          answerId: message.answerId
        };
        this.chat.messages.push(newMsg);
      }
      this.onRefreshMessages();
      this.readIncomeMessages();
      this.browserNotification(message);
    }
  }

  @Input()
  public set updateStatusMessage(message: DTO_Message) {
    if(!this.chat || !this.chat.messages) {
      return;
    }
    let findingMessage = this.chat.messages.find(x => x.id === message.id);
    if(findingMessage) {
      findingMessage.status = message.status;
    }
  }

  @Input()
  public set relatedLinksChat(links: Array<any>) {
    if(!links) {
      this.chatRelatedLinks = [];
    }
    this.chatRelatedLinks = links.filter((item) => item.displayName);
    console.log('this.chatRelatedLinks', this.chatRelatedLinks)
  }

  @Input()
  readIncomeMessages() {
    if(this.chat.access == 'read' || !this.isGoAngularChatSelected) {
      return;
    }
    this.changeUnreadMessages('seen');
  }

  @Output()
  openCardClick = new EventEmitter<any>(); 

  @Output()
  refreshChatList = new EventEmitter<any>();

  @Output()
  loadMoreChatList = new EventEmitter<any>();

  changeUnreadMessages(status: string) {
    if(!this.chat || !this.chat.messages) {
      return;
    }
    let unreadMessages: Array<DTO_Message> = this.chat.messages.filter((message) => {
      if(message.send_type !== 'inbound') {
        return false;
      }
      if(status !== 'answered') {
        return message.status === 'new';
      } else {
        return message.status === 'new' || message.status === 'seen';
      }
    });
    
    if(unreadMessages.length == 0) {
      return;
    }
    this.serviceHelper.callService({
      serviceName: "GoChatService",
      methodName: "ChangeMessageStatus",
      callback: (messageIds: any) => {
        unreadMessages.forEach((message) => {
          message.status = status;
        })
        this.onRefreshMessages();
      },
      scope: this,
      data: {
        chatId: this.chat.chat.id,
        msgIds: unreadMessages.map(x=>x.id),
        newStatusId: status === 'answered' ?
          Constants.Message.Status.answered :
          this.terrasoft.GUID_EMPTY
      }
    }, this);
  }

  showChat(event: any) {
    this.selectedChatId = event.chatId;
    this.isShowChatList = false;
    this.serviceHelper.callService("GoChatService", "OpenChatById", (response: any) => {
      console.log(response)
    }, event, this);
  }

  showChatList() {
    this.isShowChatList = true;
    this.chat = new DTO_Chat;
    this.onResetRowSpanFooter();
    this.cd.detectChanges();
  }

  browserNotification(message: any) {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
    } else if (Notification.permission === "granted") {
      const notification = new Notification("Чат с пользователем", { body: message.text});
      notification.onclick = (event) => {
        this.showChat({chatId: message.chatId});
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
      });
    }
  }

  onOpenCard(eventData: any) {
    this.openCardClick.emit(eventData);
  }

  onEditRowSpanFooter() {
    if(this.rowSpanFooter < 8) {
      this.rowSpanFooter += 1;
      this.rowSpanMessages -= 1;
    }
  }

  onResetRowSpanFooter() {
    this.rowSpanHeader = 1;
    this.rowSpanMessages = 18;
    this.rowSpanFooter = 1;
  }

  onRefreshMessages() {
    this.zone.run(() => this.chat = Object.assign({}, this.chat));
    this.zone.run(() => this.chat = Object.assign({}, this.chat));
  }

  getChatList() {
    this.refreshChatList.emit();
  }

  loadMoreChats() {
    this.loadMoreChatList.emit();
  }
}