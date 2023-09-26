import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-angular-chat-list-chats',
  templateUrl: './angular-chat-list-chats.component.html',
  styleUrls: ['./angular-chat-list-chats.component.scss'],
})
export class AngularChatListChatsComponent {
  @Input() chatList: any;
  @Output() isShowChat = new EventEmitter();

  showChat(event: any){
    this.isShowChat.emit(event);
  }
}
