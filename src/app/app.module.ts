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
import { CuecardTriggerComponent } from './angular-trigger-list/angular-trigger-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CuecardTriggerComponent
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
      const el = createCustomElement(CuecardTriggerComponent, { injector: this.injector });
      customElements.define('angular-trigger-synonyms-component', el);
  }
}
