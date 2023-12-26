import { Component, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import {ConvertDateService} from '../services/convert-date.service';
import {TranslateByLocale} from '../services/translate-by-locate.service';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-angular-chat-messages',
  templateUrl: './angular-chat-messages.component.html',
  styleUrls: ['../angular-chat/angular-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AngularChatMessagesComponent {  
  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
  @Input() chat: any;
  @Input() locale: any;
  @Input() public serviceHelper : any;
  readonly constants = Constants;

  public arrayClassNameByMessage: any = 
  {
    'inbound': 'message sender',
    'outbound': 'message receiver',
    'media': 'media-message',
    'delimiter': 'delimiter'
  }

  constructor(public convertDate: ConvertDateService, public translateRecord: TranslateByLocale){}

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

  parseMsgConfigToBtns(messageConfig: any){
    if(!messageConfig) return [];
    let result: any = [];
    try{
      return JSON.parse(messageConfig.replace(/;/g, ',')).buttons.length > 0 ? JSON.parse(messageConfig.replace(/;/g, ',')).buttons : result;
    } catch {
      console.log('Error parse config message.')
      return result;
    }


  }

  processMessage(message: any){
   // if(message.type == 'phonerequest') return `${this.translateRecord.getTranslateWord(this.locale, 'phonerequest')} ${this.addDateAndStatusToMessage(message)}`;
    return `${this.checkHrefInMessage(message.text)} ${this.addDateAndStatusToMessage(message)}`;
  }

  processMediaMessage(message:any){
    return `${this.checkSendTypeMediaMessage(message)}`;
  }

  checkSendTypeMediaMessage(message: any){
    let textMsg  = message.send_type === 'outbound'
                                        ? message.text 
                                        : this.translateRecord.getTranslateWord(this.locale, 'mediaMessageInbound');

    let msgClass = message.send_type === 'outbound'
                                        ? 'outbound-media' 
                                        : '';

    return `<div class=${msgClass}>${textMsg} ${this.addDateAndStatusToMessage(message)}</div>`;
    
  }
  addDateAndStatusToMessage(message: any){
    return `
      <div class="${message.send_type == 'delimiter'
                                      ? 'message-time-delimiter'
                                      : 'message-time-receiver'}">
        <div class="container-time-status">
            ${this.convertDate.convertTimestamp(message.unixDate, message.isSkipUTC)} ${message.status}  
        </div>
      </div>
      `
  }

  checkHrefInMessage(mess: string){
    let regExp = new RegExp(/(((http|https):\/\/)|(www.))([0-9a-zA-Zа-яёА-ЯЁ_-]+(?:(?:\.[0-9a-zA-Zа-яёА-ЯЁ_-]+)+))([\w.,@?^={}%&:\/~+#-]*[\w@?^=%&\/~+#}-])/g);
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

  changeMsgStatusToAnswered(event: any){
    this.serviceHelper.callService({
      serviceName: "GoChatService",
      methodName: "ChangeMessageStatus",
      callback: function(messageIds: any) {
        console.log('cтатус изменен')
        //this.updateIncomeMessagesStatus(messageIds, 'unanswered');
      },
      scope: this,
      data: {
              chatId: this.chat.chat.id,
              msgIds: [event.target.parentNode.id],
              newStatusId: this.constants.Message.Status.unanswered
            }
    }, this);
  }
}
