import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularChatComponent } from './angular-chat/angular-chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { AngularChatHeaderComponent } from './angular-chat-header/angular-chat-header.component';
import { AngularChatFooterComponent } from './angular-chat-footer/angular-chat-footer.component';
import { AngularChatMessagesComponent } from './angular-chat-messages/angular-chat-messages.component';
import { AngularChatListChatsComponent } from './angular-chat-list-chats/angular-chat-list-chats.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NgClickOutsideDirective } from 'ng-click-outside2';

@NgModule({
  declarations: [ AppComponent, AngularChatComponent, AngularChatHeaderComponent, AngularChatFooterComponent, AngularChatMessagesComponent, AngularChatListChatsComponent],
  imports: [ BrowserModule, BrowserAnimationsModule, MatIconModule, MatDividerModule, MatListModule, MatBadgeModule, MatGridListModule, NgClickOutsideDirective], 
  //bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }
  ngDoBootstrap(appRef: ApplicationRef): void {
      const el = createCustomElement(AngularChatComponent, { injector: this.injector });
      customElements.define('angular-chat-component', el);
  }
}
