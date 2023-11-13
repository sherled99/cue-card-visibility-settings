import { Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {TranslateByLocale} from '../services/translate-by-locate.service';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-angular-chat-footer',
  templateUrl: './angular-chat-footer.component.html',
  styleUrls: ['../angular-chat/angular-chat.component.scss']
})
export class AngularChatFooterComponent {
  @Input() chat: any;
  @Input() locale: any;
  @Input() public serviceHelper : any;
  @Input() terrasoft: any;
  @Input() sandbox: any;

  @Output() editRowspanInput = new EventEmitter<any>();
  @Output() resetRowspanInput = new EventEmitter<any>();
  @Output() refresMessages = new EventEmitter<any>();

  readonly constants = Constants;

  constructor(public translateRecord: TranslateByLocale){}
  
  public isHasTodayIncometMessage(){
    let currentUserTime = this.getCurrentUserTimeStamp();
    return this.chat?.messages?.find((x: any) => x.send_type === 'inbound' && (x.unixDate > currentUserTime - 86400000));
  }

  public isTelegramMessanger(){
    return this.constants.Messanger.Code.telegram === this.chat?.channel?.code;
  }

  public get isHideWelconeMessageBtn(){
    return this.isTelegramMessanger() || this.isHasTodayIncometMessage();
  }

  public getCurrentUTCTimeStamp(){
    let now = new Date();
    return Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
    now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
  }
  
  public getCurrentUserTimeStamp(){
    let utcNow = this.getCurrentUTCTimeStamp();
    return utcNow + this.terrasoft.SysValue.CURRENT_USER_TIMEZONE_OFFSET*60000;
  }

  public saveNewOutcomeMessage(message: string, event: any) {
    if(event !== null && event.key == 'Enter'){
      event.preventDefault();
    }

    if(message.replace(/^\s*[\r\n ]/gm, '') === '') return;
    
    let newMsg = {
        type: 'text',
        unixDate: new Date(),
        text: message,
        send_type: 'outbound',
        status: 'new',
        id: '',
        isSkipUTC: true
    };
    this.chat.messages.push(newMsg);

    let inputValue = (document.getElementById('main-input-message') as HTMLInputElement) !== null
                      ? (document.getElementById('main-input-message') as HTMLInputElement): {value: ' '};
    inputValue.value = ''; 
    this.resetRowspanInput.emit();

    let args:Record<string, any>  = {
      chatId: this.chat.chat.id,
      text: message
    };
    if(event && event.isTemplate){
      args['TemplateId'] = event.id
    }
    console.log('new message args !! ', args);
    const methodName = event && event.isTemplate ? 'CreateTemplate' : 'CreateMessage';
    this.serviceHelper.callService({
        serviceName: "GoChatService",
        methodName: methodName,
        callback: function(messageId: any) {
          console.log('messageId ', messageId);
          newMsg.id = messageId;
        },
        scope: this,
        data: args
    }, this);

    this.chat.messages = Object.assign([], this.chat.messages);

    let listIncomeMessage = this.chat.messages?.filter((x: any)=>(x.status === 'seen' || 'new') && x.send_type ==='inbound')
                                                .map((x: { id: any; })=>x.id);
    console.log('listIncomeMessage', listIncomeMessage);
    if(listIncomeMessage.length == 0) return;
    this.serviceHelper.callService({
      serviceName: "GoChatService",
      methodName: "ChangeMessageStatus",
      callback: function(messageIds: any) {
        this.updateIncomeMessagesStatus(messageIds, 'answered');
      },
      scope: this,
      data: {
              chatId: this.chat.chat.id,
              msgIds: listIncomeMessage,
              newStatusId: this.constants.Message.Status.answered
            }
    }, this);
  }

  
  async uploadFileFromInput(event: any){
    const file = event.target.files[0];
    console.log("File: ", file);
    
    let filename = file.name;
    let imageString = await this.convertBase64(file);
    let args:Record<string, any>  = {
      chatId: this.chat.chat.id,
      filename: filename,
      data: imageString
    };

    this.serviceHelper.callService({
      serviceName: "GoChatService",
      methodName: "UploadMedia",
      callback: function(result: any) {
        let newMsg = {
          type: 'media',
          unixDate: new Date(),
          text: imageString,
          send_type: 'outbound',
          status: 'new',
          id: result.media_id,
          isSkipUTC: true,
          chatId: this.chat.chat.id,
          fileName: filename
        };
        console.log('newMsg ', newMsg);

        this.chat.messages.push(newMsg);
      },
      scope: this,
      data: args
    }, this);
  }


  convertBase64 (file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };


  public updateIncomeMessagesStatus(changedMessageIds: any, status: string){
    if(changedMessageIds?.length == 0) return;
    this.chat.messages = this.chat.messages.map((x: any) => {
      if(changedMessageIds.find((msg: any) => msg.id == x.id)) x.status = status;
      return x;
    });
  }

  public saveNewIncomeMessage(message: any){
    console.log('saveNewIncomeMessage', message)
    if(this.chat.chat.id !== message.chatId) return;
    let newMsg = {
      type: message.type,
      unixDate: message.unixDate,
      text: message.text,
      send_type: 'inbound',
      status: 'new',
      id: message.id,
      isSkipUTC: true
    };
    console.log('saveNewIncomeMessage!!!!!!!', newMsg)

    let existedMessage = this.chat.messages.find((el: any) => el.id === message.id);

    if(existedMessage){
      this.chat.messages[this.chat.messages.indexOf(existedMessage)].text = message.text;
    } else {
      this.chat.messages.push(newMsg);
    } 
    this.chat.messages = Object.assign([], this.chat.messages);
  }

  showTemplateLookup(type: string){
    let filters = this.terrasoft.createFilterGroup();
    filters.name = "typeFilter";
    filters.logicalComparisonTypes = this.terrasoft.LogicalOperatorType.AND;
    filters.GoType = type;
    let typeFilter = this.terrasoft.createColumnFilterWithParameter(
      this.terrasoft.ComparisonType.EQUAL, "GoType",
      type);

    filters.addItem(typeFilter);

    const lookupConfig = {
      entitySchemaName: "GoMsgTemplateMessage",
      multiSelect: false,
      columns: ["Id", "GoName", "GoText"],
      filters: filters
    };
    const config = {
      "lookupConfig": lookupConfig,
      "sandbox": this.sandbox,
      "keepAlive": false
    };
    this.terrasoft.LookupUtilities.open(config, (e:any) =>{
      let selectedRow = e.selectedRows.collection.items[0];
      this.saveNewOutcomeMessage(selectedRow["GoText"], {isTemplate: true, id: selectedRow["Id"]});
      this.refresMessages.emit({});
    }, this);
  }

  onChangeInputSize(event: any){
    if(event.target.scrollTop > 0){
      this.editRowspanInput.emit();
    }
    if(event.target.value == ''){
      this.resetRowspanInput.emit();
    }
  }

}

