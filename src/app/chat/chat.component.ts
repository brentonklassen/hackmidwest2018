import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

declare global {
  interface Window { Twilio: any; }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private http: Http) {
    const url = 'http://localhost:3000/token/brenton?device=browser'
    http.get(url).subscribe((res:Response) => {
      const token = res.json().token;
      window.Twilio.Chat.Client.create(token).then(client => {
        console.log('bk client', client);
      });
    });
  }

  ngOnInit() {
  }

}
