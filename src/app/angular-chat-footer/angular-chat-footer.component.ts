import { Component, EventEmitter, Input, Output} from '@angular/core';
import { TranslateByLocale } from '../services/translate-by-locate.service';
import { Constants } from '../common/constants';
import { DTO_Chat } from '../models/DTO_Chat';
import { DTO_Message } from '../models/DTO_Message';

@Component({
  selector: 'app-angular-chat-footer',
  templateUrl: './angular-chat-footer.component.html',
  styleUrls: ['./angular-chat-footer.component.scss']
})
export class AngularChatFooterComponent {
  messageValue: string = "";

  readonly constants = Constants;

  constructor(public translateRecord: TranslateByLocale) {}

  @Input()
  chat: DTO_Chat = new DTO_Chat();

  @Input()
  locale: any;

  @Input()
  serviceHelper : any;

  @Input()
  terrasoft: any;

  @Input()
  sandbox: any;

  @Output()
  editRowspanInput = new EventEmitter<any>();

  @Output()
  resetRowspanInput = new EventEmitter<any>();

  @Output()
  refresMessages = new EventEmitter<any>();

  @Output()
  changeUnreadMessages = new EventEmitter<any>();

  showTemplateLookup(type: string) {
    const filters = this.terrasoft.createFilterGroup();
    filters.addItem(
      this.terrasoft.createColumnFilterWithParameter(
        this.terrasoft.ComparisonType.EQUAL,
        "GoType",
        type
      )
    );

    const lookupConfig = {
      entitySchemaName: "GoMsgTemplateMessage",
      multiSelect: false,
      columns: ["Id", "GoName", "GoText", "GoConfig"],
      filters: filters
    };
    const config = {
      "lookupConfig": lookupConfig,
      "sandbox": this.sandbox,
      "keepAlive": false
    };
    this.terrasoft.LookupUtilities.open(config, (e:any) => {
      let selectedRow = e.selectedRows.collection.items[0];
      this.messageValue = selectedRow["GoText"];
      this.createNewMessage({isTemplate: true, id: selectedRow["Id"]});
      this.refresMessages.emit();
    }, this);
  }

  createNewMessage(event: any) {
    if(event !== null && event.key == 'Enter') {
      event.preventDefault();
    }

    if(this.messageValue.replace(/^\s*[\r\n ]/gm, '') === '') {
      return;
    }

    let args:Record<string, any>  = {
      chatId: this.chat.chat.id,
      text: this.messageValue
    };

    if(event && event.isTemplate){
      args['TemplateId'] = event.id
    }
    this.messageValue = "";
    this.resetRowspanInput.emit();
    console.log('new message args', args);

    const maskId = this.terrasoft.Mask.show({});

    const createConfig = {
      serviceName: "GoChatService",
      methodName: event && event.isTemplate ? 'CreateTemplate' : 'CreateMessage',
      callback: (message: DTO_Message) => {
        this.terrasoft.Mask.hide(maskId);

        if(!message.success) {
          this.terrasoft.showErrorMessage(message.error);
          console.error("createNewMessage", message);

          return;
        }

        console.log('createNewMessage', message);

        this.chat.messages.push(message);

        this.refresMessages.emit();
        this.changeUnreadMessages.emit('answered');
      },
      scope: this,
      data: args
    };
    this.serviceHelper.callService(createConfig);
  }

  async createNewMediaMessage(event: any) {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;
    const imageString = await this.convertBase64(file);

    const args:Record<string, any>  = {
      chatId: this.chat.chat.id,
      filename: fileName,
      data: imageString
    };

    const maskId = this.terrasoft.Mask.show({});

    const config = {
      serviceName: "GoChatService",
      methodName: "UploadMedia",
      callback: (message: DTO_Message) => {
        this.terrasoft.Mask.hide(maskId);

        if(!message.success) {
          this.terrasoft.showErrorMessage(message.error);
          console.error("createNewMessage", message);
          
          return;
        }

        console.log('createNewMediaMessage', message);

        this.chat.messages.push(message);

        this.refresMessages.emit();
        this.changeUnreadMessages.emit('answered');
      },
      scope: this,
      data: args
    };
    this.serviceHelper.callService(config);
  }

  get isHideWelconeMessageBtn() {
    return this.isTelegramMessanger() || this.isHasTodayIncomeMessage();
  }
  
  isHasTodayIncomeMessage() {
    let currentUserTime = this.getCurrentUserTimeStamp();

    return this.chat?.messages?.find((x: any) => x.send_type === 'inbound' && (x.unixDate > currentUserTime - 86400000));
  }

  isTelegramMessanger() {
    return this.chat &&
      this.chat.channel &&
      this.chat.channel.code === Constants.Messanger.Code.telegram;
  }

  getCurrentUTCTimeStamp() {
    let now = new Date();
    
    return Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    );
  }
  
  getCurrentUserTimeStamp() {
    let utcNow = this.getCurrentUTCTimeStamp();
    return utcNow + this.terrasoft.SysValue.CURRENT_USER_TIMEZONE_OFFSET * 60000;
  }

  convertBase64 (file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  onChangeInputSize(event: any) {
    if(event.target.scrollTop > 0){
      this.editRowspanInput.emit();

      return;
    }

    if(!event.target.value){
      this.resetRowspanInput.emit();

      return;
    }
  }
}