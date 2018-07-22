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
  providers: []
})
export class ChatComponent implements OnInit {

  channel;
  messageList = [];
  composedMessage: string;
  username: string;

  constructor(private http: Http, private apiService: ApiService) {

    const _this = this;

    const url = `http://localhost:3000/token`;
    const channelName = 'general';

    apiService.getApiResponse(url).subscribe((response) => {
      const token = response.token;
      _this.username = response.identity;
      window.Twilio.Chat.Client.create(token).then(client => {
        client.getSubscribedChannels().then(channels => {
          client.getChannelByUniqueName(channelName).then(channel => {
            _this.channel = channel;
            _this.joinChannel();
            _this.listenForNewMessages();
          });
        });
      });
    });
  }

  joinChannel() {
    this.channel.join().then(joined => {
      console.log('joined!', joined);
    }).catch(err => {
      console.warn('didn\'t join because', err);
    });
  }

  listenForNewMessages() {
    const _this = this;
    _this.channel.on('messageAdded', message => {
      _this.messageList.push(message);
      _this.scrollMessagesUp();
    });
  }

  sendMessage() {
    const _this = this;
    _this.channel.sendMessage(_this.composedMessage);
    _this.composedMessage = '';
    this.scrollMessagesUp();
  }

  scrollMessagesUp() {
    setTimeout(()=>{
      window.scrollTo(0,document.body.scrollHeight);
    }, 0);
  }

  ngOnInit() {
  }

}
