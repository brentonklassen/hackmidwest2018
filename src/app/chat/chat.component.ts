import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

declare global {
  interface Window { Twilio: any; }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ApiService]
})
export class ChatComponent implements OnInit {

  channel;
  messageList = [];

  constructor(private http: Http, private apiService: ApiService) {

    const _this = this;

    const url = 'http://localhost:3000/token/parth?device=browser';

    apiService.getApiResponse(url).subscribe( (response) => {
      const token = response.token;
      window.Twilio.Chat.Client.create(token).then(client => {
        client.getSubscribedChannels().then(channels => {
          client.getChannelByUniqueName('general').then(generalChannel => {
            _this.channel = generalChannel;
            generalChannel.join().then(joined => {
              console.log('joined!', joined);
            }).catch(err => {
              console.warn('didn\'t join because', err);
            });
            generalChannel.on('messageAdded', message => {
              console.log('bk message', message.body);
              _this.messageList.push(message.body);
            });
          });
        });
      });
    });




  }

  sendMessage(message :string) {
    const _this = this;
    _this.channel.sendMessage(message);
  }

  ngOnInit() {
  }

}
