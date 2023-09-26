import { Component, ViewChild, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { AngularChatFooterComponent } from '../angular-chat-footer/angular-chat-footer.component';
import { DTO_ChatList } from '../models/DTO_ChatList';
import { DTO_Chat } from '../models/DTO_Chat';

@Component({
  selector: 'app-angular-chat',
  templateUrl: './angular-chat.component.html',
  styleUrls: ['./angular-chat.component.scss']
})
export class AngularChatComponent {
  public isShowChatList = true;
  constructor(public zone: NgZone){}
  @ViewChild(AngularChatFooterComponent) ChatFooter !:any ;

  @Input() public serviceHelper : any;
  @Input() public ownerId : any;
  @Input() public locale : any;
  @Input() public isGoAngularChatSelected : any;
  @Input() public terrasoft: any;
  @Input() public sandbox: any;
  @Input() public chatList: DTO_ChatList[] = [];
  @Input() public chat: DTO_Chat = new DTO_Chat;
  @Input() lastNewIncomeMessageId: any;  

  @Output() openCardClick = new EventEmitter<any>(); 
  @Output() refreshChatList = new EventEmitter<any>(); 


  @Input() public set openchat(chat: any){
    this.chat = chat;
    this.isShowChatList = false;
    this.readIncomeMessages();
  }

  @Input() public set newincomemessage(message: any){
    if(this.lastNewIncomeMessageId == message.id) return;
    
    this.lastNewIncomeMessageId = message.id;

    if((this.isShowChatList || !this.isGoAngularChatSelected) && this.chatList.find((el: any) => el.id === message.chatId)) {
      this.getChatList();
      this.browserNotification();
    } 
    if(this.chat?.chat?.id === message.chatId){
      this.ChatFooter.saveNewIncomeMessage(message);
      this.readIncomeMessages();
      this.browserNotification();
    }
  }

  @Input() public set updateStatusmessage(message: any){
    this.chat.messages.find(x => x.id === message.id).status = message.status;
  }

  @Input() public readIncomeMessages(){
    if(this.chat.access == 'read' || !this.isGoAngularChatSelected) return;

    let unreadMeaasgeIds = this.chat.messages?.filter(x=>x.status === 'new' && x.send_type ==='inbound').map(x=>x.id);

    if(unreadMeaasgeIds.length == 0) return;

    this.serviceHelper.callService({
      serviceName: "GoChatService",
      methodName: "ChangeMessageStatus",
      callback: function(messageIds: any){
        this.ChatFooter.updateIncomeMessagesStatus(messageIds, 'seen');
        this.chat.messages = Object.assign([],  this.chat.messages);
      },
      scope: this,
      data: {chatId: this.chat.chat.id, msgIds: unreadMeaasgeIds}
    }, this);
  }

  onRefreshMessages(event: any){
    this.zone.run(() => this.chat = Object.assign({}, this.chat));
  }

  public onOpenCard(eventData: any) {
    this.openCardClick.emit(eventData);
  }

  public openChat(event: any){
    this.isShowChatList = false;
    this.serviceHelper.callService("GoChatService", "OpenChat", (response: any) => {}, event, this);
  }

  public showChatList(){
    this.isShowChatList = true;
    this.getChatList();
  }

  public browserNotification(){
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
    } else if (Notification.permission === "granted"){
      const text = "Вам пришло новое сообщение!";
      const notification = new Notification("Чат с пользователем", { body: text});
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
      });
    }
  }

  getChatList(){
    this.refreshChatList.emit();
  }
}
