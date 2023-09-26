import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-angular-chat-header',
  templateUrl: './angular-chat-header.component.html',
  styleUrls: ['../angular-chat/angular-chat.component.scss']
})
export class AngularChatHeaderComponent{
  @Input() chat: any;
  @Output() backToListChat = new EventEmitter();
  @Output() cardClick = new EventEmitter<any>(); 

  backToAllList(event: any){
    this.backToListChat.emit(null);
  }

  public onOpenCard(eventData: any) {
    this.cardClick.emit(eventData);
  }
}
