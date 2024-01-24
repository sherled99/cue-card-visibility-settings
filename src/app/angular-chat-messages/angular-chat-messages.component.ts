import { Component, Input, ViewChild, ElementRef, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { ConvertDateService } from '../services/convert-date.service';
import { TranslateByLocale } from '../services/translate-by-locate.service';
import { Constants } from '../common/constants';
import { DTO_Chat } from '../models/DTO_Chat';

@Component({
  selector: 'app-angular-chat-messages',
  templateUrl: './angular-chat-messages.component.html',
  styleUrls: ['./angular-chat-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AngularChatMessagesComponent implements OnChanges {
  arrayClassNameByMessage: any = 
  {
    'inbound': 'message sender',
    'outbound': 'message receiver',
    'media': 'media-message',
    'delimiter': 'delimiter'
  }

  constructor(public convertDate: ConvertDateService, public translateRecord: TranslateByLocale) {}

  @ViewChild('chatListContainer')
  list?: ElementRef<HTMLDivElement>;

  @Input()
  chat: DTO_Chat = new DTO_Chat();

  @Input()
  locale: any;

  @Input()
  serviceHelper : any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["chat"]?.currentValue) {
      this.deleteMessageDelimiters();
      this.addMessageDelimiters();

      setTimeout(() => {
        this.scrollToBottom();
      }); 
    }
  }

  deleteMessageDelimiters() {
    this.chat.messages = this.chat.messages.filter((message) => message.send_type !== 'delimiter');
  }

  addMessageDelimiters() {
    let resultMessages: Array<any> = []; 

    if(!this.chat.messages) {
      this.chat.messages = resultMessages;
      return;
    }

    let prevDate = 0;

    const today = new Date().setHours(0,0,0,0);
    const months = this.translateRecord.getTranslateWord(this.locale, 'month');
    const toDayStr = this.translateRecord.getTranslateWord(this.locale, 'toDay');
    
    this.chat.messages.forEach((listMessage) => {
      let messageDate = new Date(listMessage.unixDate).setHours(0,0,0,0);

      if(!listMessage.isSkipUTC) {
        messageDate = new Date(
          new Date(listMessage.unixDate).getUTCFullYear(),
          new Date(listMessage.unixDate).getUTCMonth(),
          new Date(listMessage.unixDate).getUTCDate()
        ).setHours(0,0,0,0);
      }
      
      if(messageDate != prevDate) {
        prevDate = messageDate;
        let deilimeterStr = `${new Date(messageDate).getDate()} ${months[new Date(messageDate).getMonth()]}`;
        resultMessages.push({
          text: messageDate == today ? toDayStr : deilimeterStr,
          send_type: 'delimiter'
        });
      }
      resultMessages.push(listMessage);
    });

    this.chat.messages = resultMessages;
  };

  scrollToBottom() {
    const maxScroll = this.list?.nativeElement.scrollHeight;
    this.list?.nativeElement.scrollTo({top: maxScroll, behavior: 'auto'});
  }

  parseMsgConfigToBtns(messageConfig: any) {
    if(!messageConfig) {
      return [];
    }
    let result: any = [];

    try{
      return JSON.parse(messageConfig.replace(/;/g, ',')).buttons.length > 0 ? JSON.parse(messageConfig.replace(/;/g, ',')).buttons : result;
    } catch {
      console.log('Error parse config message.', messageConfig);

      return result;
    }
  }

  processMessage(message: any) {
    return `${this.checkHrefInMessage(message.text)} ${this.addDateAndStatusToMessage(message)}`;
  }

  processMediaMessage(message:any) {
    return `${this.checkSendTypeMediaMessage(message)}`;
  }

  checkSendTypeMediaMessage(message: any) {
    let textMsg  = message.send_type === 'outbound' ?
      message.text :
      this.translateRecord.getTranslateWord(this.locale, 'mediaMessageInbound');

    let msgClass = message.send_type === 'outbound' ?
      'outbound-media' :
      '';

    return `
      <div class="${msgClass}">
        ${textMsg} ${this.addDateAndStatusToMessage(message)}
      </div>`;
  }

  addDateAndStatusToMessage(message: any) {
    return `
      <div class="${message.send_type == 'delimiter' ?
        'message-time-delimiter' :
        'message-time-receiver'}">
        <div class="container-time-status">
            ${this.convertDate.convertTimestamp(message.unixDate, message.isSkipUTC)} ${message.status}   
        </div>
      </div>`;
  }

  checkHrefInMessage(mess: string) {
    let regExp = new RegExp(/(((http|https):\/\/)|(www.))([0-9a-zA-Zа-яёА-ЯЁ_-]+(?:(?:\.[0-9a-zA-Zа-яёА-ЯЁ_-]+)+))([\w.,@?^={}%&:\/~+#-]*[\w@?^=%&\/~+#}-])/g);
    let result = mess.match(regExp) || [];

    for(let i = 0; i < result.length; i++) {
      mess = mess.replace( result[i], `<a href=${result[i]}>${result[i]}</a>`);
    };

    return mess.split('\n').join('<br>');                
  }

  downloadFile(messageId: any) {
    const config = {
      serviceName: "GoChatService",
      methodName: "GetMedia",
      callback: function(result: any) {
        console.log('messageId ', result);
        const src = `${result.data}`;
        const link = document.createElement("a");
        link.href = src;
        link.download = result.filename ?? 'file.png';
        link.click();
        link.remove();
      },
      scope: this,
      data: messageId
    };
    this.serviceHelper.callService(config);
  }

  changeMsgStatusToAnswered(event: any) {
    const config = {
      serviceName: "GoChatService",
      methodName: "ChangeMessageStatus",
      callback: function(messageIds: any) {
        console.log('ChangeMessageStatus response', messageIds);
      },
      scope: this,
      data: {
        chatId: this.chat.chat.id,
        msgIds: [event.target.parentNode.id],
        newStatusId: Constants.Message.Status.unanswered
      }
    };
    this.serviceHelper.callService(config);
  }
}