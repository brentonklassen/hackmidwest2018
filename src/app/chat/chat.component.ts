import { TokenService } from './../token.service';
import { Component, OnInit } from '@angular/core';

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
  channelName;
  messageList = [];
  composedMessage: string;
  username: string;
  finishedLoading: boolean = false;



  constructor(private tokenService: TokenService) {
    const params = (new URL(document.location.href)).searchParams;

    this.channelName = (params.get('channelName'));

    console.log('joining', this.channelName);

    this.tokenService.getTokenInfo().subscribe((response) => {
      const token = response.token;
      this.username = response.identity;
      window.Twilio.Chat.Client.create(token).then(client => {
        client.getChannelByUniqueName(this.channelName).then(channel => {
          this.channel = channel;
          this.joinChannel().then(() => {
            this.listenForNewMessages();
            this.finishedLoading = true;
          });
        });
      });
    });
  }

  joinChannel() {
    return this.channel.join().then(joined => {
      console.log('joined!', joined);
    }).catch(err => {
      console.warn('didn\'t join because', err);
    });
  }

  listenForNewMessages() {
    this.channel.on('messageAdded', message => {
      this.messageList.push(message);
      this.scrollMessagesUp();
    });
  }

  sendMessage() {
    this.channel.sendMessage(this.composedMessage);
    this.composedMessage = '';
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
