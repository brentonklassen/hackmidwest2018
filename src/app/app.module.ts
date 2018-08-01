import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpModule } from '../../node_modules/@angular/http';
import { CreateTribeComponent } from './create-tribe/create-tribe.component';
import { ChannelCreatedComponent } from './channel-created/channel-created.component';
import { EndTribeComponent } from './end-tribe/end-tribe.component';

const appRoutes: Routes = [
  { path: 'start-tribe', component: CreateTribeComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', component: HomeComponent},
  { path: 'channel-created', component: ChannelCreatedComponent},
  { path: 'end-tribe', component: EndTribeComponent }

  /* { path: 'crisis-center', component: CrisisListComponent } */

];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateTribeComponent,
    HomeComponent,
    ChannelCreatedComponent,
    EndTribeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [HttpModule, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
