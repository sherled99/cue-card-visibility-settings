import { Component, ViewChild, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { AngularChatFooterComponent } from '../angular-chat-footer/angular-chat-footer.component';
import { DTO_ChatList } from '../models/DTO_ChatList';
import { DTO_Chat } from '../models/DTO_Chat';

@Component({
  selector: 'app-angular-chat',
  templateUrl: './angular-chat.component.html',
  styleUrls: ['./angular-chat.component.scss']
})
export class AngularChatComponent {
  constructor(public zone: NgZone) {}

  _selectedChatId: string = "";

  @ViewChild(AngularChatFooterComponent) ChatFooter !:any ;

  @Input()
  public isShowChatList = true;
  @Input()
  public serviceHelper: any;
  @Input()
  public ownerId: any;
  @Input()
  public locale: string = "";
  @Input()
  public isGoAngularChatSelected: any;
  @Input()
  public terrasoft: any;
  @Input()
  public sandbox: any;
  @Input()
  public chatList: DTO_ChatList[] = [
    {
        "id": "4bdfb5d8-a3bb-4730-91e5-2ce9a24e5753",
        "name": "Chat-232500052",
        "unreadCount": 2,
        "dateOfLastMessage": 1703711010000,
        "textOfLastMessage": "отправка по пдшке тест 1",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "9b7b0197-9d48-4814-936e-5bff0b0cb170",
            "name": "Контакт с какой-то орг ролью"
        }
    },
    {
        "id": "0a1109d5-2189-41ea-bf46-8bd628dc6cc8",
        "name": "Chat-240500063",
        "unreadCount": 1,
        "dateOfLastMessage": 1705428977379.742,
        "textOfLastMessage": "Добрый день, мне не видны зака...",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "3138b273-b6a2-4253-8b46-cab12f80f703",
            "name": "Екатерина Есинова"
        }
    },
    {
        "id": "694aa7a2-08c9-47b9-8743-61c48dea0fa1",
        "name": "Chat-230500063",
        "unreadCount": 1,
        "dateOfLastMessage": 1705091356242.043,
        "textOfLastMessage": "Test Header",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "3138b273-b6a2-4253-8b46-cab12f80f703",
            "name": "Екатерина Есинова"
        }
    },
    {
        "id": "787f501c-071c-42c7-b96c-6ba03b85d3a7",
        "name": "Chat-232100078",
        "unreadCount": 1,
        "dateOfLastMessage": 1703721810000,
        "textOfLastMessage": "нет чата, нет контакта (выключ...",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "da4c58b3-329a-44b2-908e-9af36ba9d787",
            "name": "yacrm_market"
        }
    },
    {
        "id": "11cc4568-d411-4eef-9c50-2eaf97c50ef3",
        "name": "Chat-230100051",
        "unreadCount": 1,
        "dateOfLastMessage": 1700856210000,
        "textOfLastMessage": "новый чат только и контакт",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "75eb735d-610b-48c2-a0be-1d24c72eb04b",
            "name": "yacrm_market"
        }
    },
    {
        "id": "daa869a0-38d6-4f61-8ee9-c724d4633c3e",
        "name": "Chat-230000050",
        "unreadCount": 1,
        "dateOfLastMessage": 1700856210000,
        "textOfLastMessage": "новый чат только",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "490da2c6-753c-479d-b960-d64afc362554",
            "name": "Интересный человек"
        }
    },
    {
        "id": "261b0f09-1920-4752-9394-fa90d1636692",
        "name": "Chat-230900025",
        "unreadCount": 1,
        "dateOfLastMessage": 1698718809179.924,
        "textOfLastMessage": "новенький чат",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "8ae49745-cea8-491f-97b5-fe4cc0e9eab3",
            "name": "Просто пользователь"
        }
    },
    {
        "id": "18b56f54-8915-4d2f-887d-150bab2e85ed",
        "name": "Chat-233100049",
        "unreadCount": 0,
        "dateOfLastMessage": 1705429135834,
        "textOfLastMessage": "Ответное сообщение",
        "channel": {
            "id": "a2523e44-1268-4978-a65b-e06638a8caf6",
            "name": "test_channel_food",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "01ae0502-26ec-48e0-851f-eb676bb1fecf",
            "name": "Григорий Лепс"
        }
    },
    {
        "id": "9dd1ed8e-8f72-4a4b-8e97-29299c5fb494",
        "name": "Chat-230100045",
        "unreadCount": 0,
        "dateOfLastMessage": 1705091239015.408,
        "textOfLastMessage": "проверка придет скажи??? в дру...",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "e1bd1771-02ae-45b8-8eb0-ce50972288df",
            "name": "Артём Суховер"
        }
    },
    {
        "id": "100ee902-a5b4-4d0e-9b28-ffd61501486c",
        "name": "Chat-232600030",
        "unreadCount": 0,
        "dateOfLastMessage": 1704921029848,
        "textOfLastMessage": "Добрый",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "f941b44f-85e2-4ab0-beb6-ba4bc6eec4e5",
            "name": "Тим"
        }
    },
    {
        "id": "50c517ea-6fb4-4732-b369-b1b2778edb38",
        "name": "Chat-230200018",
        "unreadCount": 0,
        "dateOfLastMessage": 1703811722938.358,
        "textOfLastMessage": "входящее для работы",
        "channel": {
            "id": "a2523e44-1268-4978-a65b-e06638a8caf6",
            "name": "test_channel_food",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Supervisor"
        },
        "contact": {
            "id": "3138b273-b6a2-4253-8b46-cab12f80f703",
            "name": "Екатерина Есинова"
        }
    },
    {
        "id": "57247f76-621c-47c0-aec4-c38ec21ee3e5",
        "name": "Chat-230600062",
        "unreadCount": 0,
        "dateOfLastMessage": 1703640442611.332,
        "textOfLastMessage": "Test Header",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "3138b273-b6a2-4253-8b46-cab12f80f703",
            "name": "Екатерина Есинова"
        }
    },
    {
        "id": "aa25d919-244b-4372-b1e2-4a08ac9a7bdf",
        "name": "Chat-233200054",
        "unreadCount": 0,
        "dateOfLastMessage": 1702705075041.247,
        "textOfLastMessage": "кк",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "7c1b22f2-76bb-4639-9b64-91745057b75c",
            "name": "Дима "
        }
    },
    {
        "id": "0ac551e0-d30c-41d8-abec-77c93925e9e0",
        "name": "Chat-234100021",
        "unreadCount": 0,
        "dateOfLastMessage": 1702674741876.32,
        "textOfLastMessage": "",
        "channel": {
            "id": "a2523e44-1268-4978-a65b-e06638a8caf6",
            "name": "test_channel_food",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Обычный оператор оператор оператор 1"
        },
        "contact": {
            "id": "06585c34-c08b-4ff1-85cc-a0ecbce220ec",
            "name": "Александр Горинов"
        }
    },
    {
        "id": "4c467b1d-6822-4dfc-b183-cf2ffcb10877",
        "name": "Chat-231200054",
        "unreadCount": 0,
        "dateOfLastMessage": 1702504518382.872,
        "textOfLastMessage": "Как вам наш бот?",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Игорь Чурков"
        },
        "contact": {
            "id": "f2b552e8-ac3d-4339-916e-2eb7a84e47f7",
            "name": "Игорь Чурков"
        }
    },
    {
        "id": "a5f600e1-7c25-4f80-81ca-ec25c61feb4a",
        "name": "Chat-231000060",
        "unreadCount": 0,
        "dateOfLastMessage": 1702422612003.219,
        "textOfLastMessage": "Добрый день, чтобы продолжить ...",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Supervisor"
        },
        "contact": {
            "id": "028bf7c2-860e-449e-a792-1e4090d1741b",
            "name": "Тимофей С"
        }
    },
    {
        "id": "96064445-d114-417d-b7d9-6e8812d2d99e",
        "name": "Chat-231400053",
        "unreadCount": 0,
        "dateOfLastMessage": 1702338943604.407,
        "textOfLastMessage": "Добрый день! Вас беспокоит слу...",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Supervisor"
        },
        "contact": {
            "id": "06585c34-c08b-4ff1-85cc-a0ecbce220ec",
            "name": "Александр Горинов"
        }
    },
    {
        "id": "fa7f4696-9b28-4583-891c-cd09968fe46e",
        "name": "Chat-230900026",
        "unreadCount": 0,
        "dateOfLastMessage": 1701746666487.907,
        "textOfLastMessage": "проверка телеги",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": ""
        },
        "contact": {
            "id": "01ae0502-26ec-48e0-851f-eb676bb1fecf",
            "name": "Григорий Лепс"
        }
    },
    {
        "id": "09b0b016-4959-49a4-9915-e6755c334dd2",
        "name": "Chat-235900017",
        "unreadCount": 0,
        "dateOfLastMessage": 1701737745268.424,
        "textOfLastMessage": "Добрый день! Вас беспокоит слу...",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Supervisor"
        },
        "contact": {
            "id": "0e9441bb-fa3c-430c-b663-4edd982124e8",
            "name": "Крутой оператор"
        }
    },
    {
        "id": "c02d13ae-507a-47c3-944f-62b7fc4a85dc",
        "name": "Chat-232900041",
        "unreadCount": 0,
        "dateOfLastMessage": 1701288353883.145,
        "textOfLastMessage": "Добрый день! Вас беспокоит слу...",
        "channel": {
            "id": "a2523e44-1268-4978-a65b-e06638a8caf6",
            "name": "test_channel_food",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Обычный оператор оператор оператор 1"
        },
        "contact": {
            "id": "06478087-9073-4830-bd8b-dc997f0c1c6a",
            "name": "yacrm_market"
        }
    },
    {
        "id": "51526708-8ffb-47d1-908b-b3fdcac9c3d2",
        "name": "Chat-232000056",
        "unreadCount": 0,
        "dateOfLastMessage": 1701123627594.029,
        "textOfLastMessage": "Добрый день! Вас беспокоит слу...",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "0458aff9-17e7-40bd-86c2-33abcb463520",
            "name": "создадим контакт"
        }
    },
    {
        "id": "0704e3b5-5e78-4225-9546-0938d38a235d",
        "name": "Chat-232700036",
        "unreadCount": 0,
        "dateOfLastMessage": 1700086799425.082,
        "textOfLastMessage": "Добрый день! Вас беспокоит слу...",
        "channel": {
            "id": "8eef0a75-6ff4-41d5-8378-33d3878aaa12",
            "name": "tg merchants",
            "code": "telegram"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "699dae5f-aaf8-4110-a7e4-6fdbd410631f",
            "name": "Алёша Попович"
        }
    },
    {
        "id": "a2090ad4-2eec-4f3a-ac1e-f1ad2b781dc6",
        "name": "Chat-232800055",
        "unreadCount": 0,
        "dateOfLastMessage": 1699907394861,
        "textOfLastMessage": "Добрый день! Вас беспокоит слу...",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "748d67ef-974e-4990-8d60-9ada19fc0cc0",
            "name": "контакт 13.11"
        }
    },
    {
        "id": "fd928c39-67f4-479c-9388-9d13cd6faae5",
        "name": "Chat-230700054",
        "unreadCount": 0,
        "dateOfLastMessage": 1699644690816,
        "textOfLastMessage": "пам",
        "channel": {
            "id": "a2523e44-1268-4978-a65b-e06638a8caf6",
            "name": "test_channel_food",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Екатерина Есинова"
        },
        "contact": {
            "id": "55341ed4-34fb-41ee-be0e-907daf3e26af",
            "name": "Дубль контакта"
        }
    },
    {
        "id": "49afe9bf-d2aa-4580-9faa-8500edf9ca30",
        "name": "Chat-233800047",
        "unreadCount": 0,
        "dateOfLastMessage": 1699499010000,
        "textOfLastMessage": "в текущий контакт",
        "channel": {
            "id": "b1053a51-d066-4c8a-89b8-8d87df2c133a",
            "name": "yacrm_market",
            "code": "whatsapp"
        },
        "owner": {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Контакт с какой-то орг ролью"
        },
        "contact": {
            "id": "ee4b3eef-dfc5-4343-b935-f7c56e7e6af4",
            "name": "Проверка создания"
        }
    }
];
  @Input()
  public chat: DTO_Chat = new DTO_Chat();
  @Input()
  lastNewIncomeMessageId: any;  
  @Input()
  public rowspanInput = 1;
  @Input()
  chatRelatedLinks: any;

  @Output()
  openCardClick = new EventEmitter<any>(); 
  @Output()
  refreshChatList = new EventEmitter<any>(); 
  @Output()
  refreshChat = new EventEmitter<any>(); 
  @Output()
  loadMoreChatList = new EventEmitter<any>(); 

  @Input()
  public set openChat(chat: any) {
    console.log('openChat ', chat);
    this.chat = chat;
    this.isShowChatList = false;
    this.readIncomeMessages();
  }

  @Input()
  public set newIncomeMessage(message: any) {
    if(this.lastNewIncomeMessageId == message.id) {
      return;
    }
    this.lastNewIncomeMessageId = message.id;

    if((this.isShowChatList || !this.isGoAngularChatSelected)) {
      this.getChat({chatId: message.chatId});

      if(this.chatList.find((el: any) => el.id === message.chatId)) {
        this.browserNotification(message);
      }
    } 

    if(this.chat?.chat?.id === message.chatId) {
      this.ChatFooter.saveNewIncomeMessage(message);
      this.readIncomeMessages();
      this.browserNotification(message);
    }
  }

  @Input()
  public set updateStatusMessage(message: any) {
    this.chat.messages.find(x => x.id === message.id).status = message.status;
  }

  @Input()
  public set relatedLinksChat(links: any) {
    this.chatRelatedLinks = links;
    console.log('this.chatRelatedLinks', this.chatRelatedLinks)
  }

  @Input()
  public readIncomeMessages() {
    if(this.chat.access == 'read' || !this.isGoAngularChatSelected) {
      return;
    }
    let unreadMeaasgeIds = this.chat.messages?.filter(x=>x.status === 'new' && x.send_type ==='inbound').map(x=>x.id);

    if(unreadMeaasgeIds.length == 0) {
      return;
    }
    this.serviceHelper.callService({
      serviceName: "GoChatService",
      methodName: "ChangeMessageStatus",
      callback: function(messageIds: any){
        this.ChatFooter.updateIncomeMessagesStatus(messageIds, 'seen');
        this.chat.messages = Object.assign([],  this.chat.messages);
      },
      scope: this,
      data: {chatId: this.chat.chat.id, msgIds: unreadMeaasgeIds}
    }, this);
  }

  public showChat(event: any) {
    this._selectedChatId = event.chatId;
    this.isShowChatList = false;
    this.serviceHelper.callService("GoChatService", "OpenChatById", (response: any) => {console.log(response)}, event, this);
  }

  public showChatList() {
    this.isShowChatList = true;
    this.chat = new DTO_Chat;
    this.getChatList();
  }

  public browserNotification(message: any) {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
    } else if (Notification.permission === "granted") {
      const notification = new Notification("Чат с пользователем", { body: message.text});
      notification.onclick = (event) => {
        this.showChat({chatId: message.chatId});
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
      });
    }
  }

  public onOpenCard(eventData: any) {
    this.openCardClick.emit(eventData);
  }

  onEditRowspanInput() {
    if(this.rowspanInput < 12) this.rowspanInput += 1;
  }

  onResetRowspanInput() {
    this.rowspanInput = 1;
  }

  onRefreshMessages(event: any) {
    this.zone.run(() => this.chat = Object.assign({}, this.chat));
  }

  getChatList() {
    this.refreshChatList.emit();
  }

  getChat(eventData: any) {
    this.refreshChat.emit(eventData);
  }

  loadMoreChats() {
    this.loadMoreChatList.emit();
  }
}
