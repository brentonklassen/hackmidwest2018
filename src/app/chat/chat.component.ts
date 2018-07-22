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
  composedMessage = '';

  constructor(private http: Http, private apiService: ApiService) {

    const _this = this;

    const url = 'http://localhost:3000/token/brenton';

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

  sendMessage() {
    const _this = this;
    _this.channel.sendMessage(_this.composedMessage);
    _this.composedMessage = '';
    window.scrollTo(0,document.body.scrollHeight);
  }

  ngOnInit() {
  }

}
