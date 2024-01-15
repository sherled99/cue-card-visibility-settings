import { Component, Input, Output, EventEmitter, HostListener, AfterViewInit } from '@angular/core';
import { ConvertDateService } from '../services/convert-date.service';
import { DTO_ChatList } from '../models/DTO_ChatList';

@Component({
  selector: 'app-angular-chat-list-chats',
  templateUrl: './angular-chat-list-chats.component.html',
  styleUrls: ['./angular-chat-list-chats.component.scss'],
})
export class AngularChatListChatsComponent implements AfterViewInit {
  constructor(public convertDate: ConvertDateService) {}

  @Input()
  selectedChatId: string = "";
  @Input()
  chatList: DTO_ChatList[] = [];

  @Output()
  showChat = new EventEmitter();
  @Output()
  loadMoreChats = new EventEmitter();

  ngAfterViewInit() {
    const element = document.getElementById(this.selectedChatId) as HTMLElement;

    if(element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  showChatHandle(event: any) {
    this.showChat.emit(event);
  }

  @HostListener("scroll", ["$event"])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 1) {
      this.loadMoreChats.emit(event);
    }
  }
}