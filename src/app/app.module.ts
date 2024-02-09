import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgClickOutsideDirective } from 'ng-click-outside2';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from "@angular/material/tooltip";

import { AppComponent } from './app.component';
import { AngularChatComponent } from './angular-chat/angular-chat.component';
import { AngularChatHeaderComponent } from './angular-chat-header/angular-chat-header.component';
import { AngularChatFooterComponent } from './angular-chat-footer/angular-chat-footer.component';
import { AngularChatMessagesComponent } from './angular-chat-messages/angular-chat-messages.component';
import { AngularChatListChatsComponent } from './angular-chat-list-chats/angular-chat-list-chats.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularChatComponent,
    AngularChatHeaderComponent,
    AngularChatFooterComponent,
    AngularChatMessagesComponent,
    AngularChatListChatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatGridListModule,
    MatMenuModule,
    MatTooltipModule,
    NgClickOutsideDirective
  ], 
  // bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  
  ngDoBootstrap(appRef: ApplicationRef): void {
      const el = createCustomElement(AngularChatComponent, { injector: this.injector });
      customElements.define('angular-chat-component', el);
  }
}
