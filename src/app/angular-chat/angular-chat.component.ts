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
  @Input() public rowspanInput = 1;
  @Input() chatRelatedLinks: any;

  @Output() openCardClick = new EventEmitter<any>(); 
  @Output() refreshChatList = new EventEmitter<any>(); 
  @Output() refreshChat = new EventEmitter<any>(); 
  @Output() loadMoreChatList = new EventEmitter<any>(); 


  @Input() public set openChat(chat: any){
    console.log('openChat ', chat);
    this.chat = chat;
    this.isShowChatList = false;
    this.readIncomeMessages();
  }

  @Input() public set newIncomeMessage(message: any){
    if(this.lastNewIncomeMessageId == message.id) return;
    
    this.lastNewIncomeMessageId = message.id;

    if((this.isShowChatList || !this.isGoAngularChatSelected)) {
      this.getChat({chatId: message.chatId});
      if(this.chatList.find((el: any) => el.id === message.chatId)){
        this.browserNotification(message);
      }
    } 
    if(this.chat?.chat?.id === message.chatId){
      this.ChatFooter.saveNewIncomeMessage(message);
      this.readIncomeMessages();
      this.browserNotification(message);
    }
  }

  @Input() public set updateStatusMessage(message: any){
    this.chat.messages.find(x => x.id === message.id).status = message.status;
  }

  @Input() public set relatedLinksChat(links: any){
    this.chatRelatedLinks = links;
    console.log('this.chatRelatedLinks', this.chatRelatedLinks)
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

  onEditRowspanInput(){
    if(this.rowspanInput < 4) this.rowspanInput += 1;
  }

  onResetRowspanInput(){
    this.rowspanInput = 1;
  }

  onRefreshMessages(event: any){
    this.zone.run(() => this.chat = Object.assign({}, this.chat));
  }

  public showChat(event: any){
    this.isShowChatList = false;
    this.serviceHelper.callService("GoChatService", "OpenChatById", (response: any) => {console.log(response)}, event, this);
  }

  public showChatList(){
    this.isShowChatList = true;
    this.chat = new DTO_Chat;
    this.getChatList();
  }

  public browserNotification(message: any){
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
    } else if (Notification.permission === "granted"){
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

  public onOpenCard(eventData: any) {
    this.openCardClick.emit(eventData);
  }

  getChatList(){
    this.refreshChatList.emit();
  }

  getChat(eventData: any){
    this.refreshChat.emit(eventData);
  }

  loadMoreChats(){
    this.loadMoreChatList.emit();
  }
}
