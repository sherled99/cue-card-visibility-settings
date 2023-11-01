import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-angular-chat-list-chats',
  templateUrl: './angular-chat-list-chats.component.html',
  styleUrls: ['./angular-chat-list-chats.component.scss'],
})
export class AngularChatListChatsComponent {
  @Input() chatList: any;
  @Output() showChat = new EventEmitter();
  @Output() loadMoreChats = new EventEmitter();

  showChatHandle(event: any){
    this.showChat.emit(event);
  }

  @HostListener("scroll", ["$event"])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 1) {
      console.log('end');
      this.loadMoreChats.emit(event);
    }
  }
}
