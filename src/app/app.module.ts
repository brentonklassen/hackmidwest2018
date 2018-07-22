import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpModule } from '../../node_modules/@angular/http';
import { CreateTribeComponent } from './create-tribe/create-tribe.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateTribeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
