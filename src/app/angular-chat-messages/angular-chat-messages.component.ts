import { Component, Input, ViewChild, ElementRef} from '@angular/core';
import {ConvertDateService} from '../services/convert-date.service';
import {TranslateByLocale} from '../services/translate-by-locate.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-angular-chat-messages',
  templateUrl: './angular-chat-messages.component.html',
  styleUrls: ['../angular-chat/angular-chat.component.scss']
})

export class AngularChatMessagesComponent {  
  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
  @Input() chat: any;
  @Input() locale: any;
  @Input() public serviceHelper : any;

  public arrayClassNameByMessage: any = 
  {
    'inbound': 'message sender bubble-arrow-sender',
    'outbound': 'message receiver bubble-arrow-receiver',
    'media': 'media-message',
    'delimiter': 'delimiter'
  }

  constructor(public convertDate: ConvertDateService, public translateRecord: TranslateByLocale, private sanitizer: DomSanitizer){}

  public get isHasNoMessage(){
    return this.chat.messages?.length === 0;
  }

  addDateToMessage(listMessage: any){
    let result: any = []; 

    if(!listMessage) return result;

    let today = new Date().setHours(0,0,0,0);
    let prevDate = 0;
    let months = this.translateRecord.getTranslateWord(this.locale, 'month');
    
    for(let i=0; i < listMessage.length; i++){
      let messageDate = new Date(listMessage[i].unixDate).setHours(0,0,0,0);
      if(messageDate != prevDate){
        prevDate = messageDate;
        if(messageDate == today){
          result.push({text: `${this.translateRecord.getTranslateWord(this.locale, 'toDay')}`, send_type: 'delimiter'});
        } else {
          result.push({text: `${new Date(messageDate).getDate()} ${months[new Date(messageDate).getMonth()]}`, send_type: 'delimiter'});
        }
      }
      result.push(listMessage[i]);
    }
    this.scrollToBottom();
    return result;
  };

  scrollToBottom() {
    const maxScroll = this.list?.nativeElement.scrollHeight;
    this.list?.nativeElement.scrollTo({top: maxScroll, behavior: 'auto'});
  }

  checkHrefInMessage(mess: string){
    let regExp = new RegExp(/(((http|https):\/\/)|(www.))([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^={}%&:\/~+#-]*[\w@?^=%&\/~+#}-])/g);
    let result = mess.match(regExp) || [];
    for(let i = 0; i < result.length; i++){
      mess = mess.replace( result[i], `<a href=${result[i]}>${result[i]}</a>`);
    };
    return mess.split('\n').join('<br>'); 
  }

  downloadFile(messageId: any){
    this.serviceHelper.callService({
        serviceName: "GoChatService",
        methodName: "GetMedia",
        callback: function(result: any) {
          console.log('messageId ', result);
          const src = `${result.data}`;
          const link = document.createElement("a");
          link.href = src;
          link.download = result.filename? result.filename : 'file.png';
          link.click();
          link.remove();
          
        },
        scope: this,
        data: messageId
    }, this);
  }
}
