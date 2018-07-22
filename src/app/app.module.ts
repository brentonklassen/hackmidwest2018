import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpModule } from '../../node_modules/@angular/http';
import { CreateTribeComponent } from './create-tribe/create-tribe.component';
import { Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'start-tribe', component: CreateTribeComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', component: HomeComponent}

  /* { path: 'crisis-center', component: CrisisListComponent } */

];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateTribeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
