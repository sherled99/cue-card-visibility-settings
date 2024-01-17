import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-angular-chat-header',
  templateUrl: './angular-chat-header.component.html',
  styleUrls: ['../angular-chat/angular-chat.component.scss'],
})
export class AngularChatHeaderComponent {
  public isShowRelatedLinks = false;
  
  @Input()
  chat: any;

  @Input()
  chatRelatedLinks: any;

  @Output()
  backToListChat = new EventEmitter();

  @Output()
  cardClick = new EventEmitter<any>(); 

  backToAllList(event: any){
    this.backToListChat.emit(null);
  }

  public onOpenCard(eventData: any) {
    this.cardClick.emit(eventData);
    this.isShowRelatedLinks = false;
  }

  public showRelatedLinks() {
    this.isShowRelatedLinks = !this.isShowRelatedLinks;
  }

  public hideRelatedLinksByOutsideClick(event: any) {
    if(this.isShowRelatedLinks && event.target.id !== 'btn-show-related-links') {
      this.isShowRelatedLinks = false;
    }
  }
}
