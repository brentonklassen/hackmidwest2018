import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-end-tribe',
  templateUrl: './end-tribe.component.html',
  styleUrls: ['./end-tribe.component.css']
})
export class EndTribeComponent implements OnInit {

  headers: Headers;
  channels: Array<Object>;

  constructor(private apiService: ApiService) {

    const headerDict = {
      'Authorization': 'Basic U0tkNTM1ZTZjNTBiYTJmZWEyNTJlNTQwNTE1MmI4YTYxMjo4NEI4RzJOMjM3NGRJUzlGdTNaVzVVMGFiamVDSEhPYQ=='
    };
    this.headers = new Headers(headerDict);

    this.getActiveChannels();

  }

  ngOnInit() {
  }

  getActiveChannels() {
    this.apiService.getApiResponse('https://chat.twilio.com/v2/Services/ISd8248562eba148a1b7033719df90b109/Channels', this.headers).subscribe((response) => {
      console.log('channels', response.channels);
      let channels = response.channels;
      channels.map(channel => {
        if(channel.attributes === '{}') {
          return channel;
        }
        let channelAttributes = JSON.parse(channel.attributes);
        if(channelAttributes.location === undefined) {
          return channel;
        }
        channel.location = channelAttributes.location;
        return channel;
      });
      this.channels = channels;
    });
  }

  endChannelBySID(sid: String) {
    this.apiService.delete('https://chat.twilio.com/v2/Services/ISd8248562eba148a1b7033719df90b109/Channels/' + sid, this.headers).subscribe((response) => {
      console.log('done ending', sid);
      this.getActiveChannels();
    });
  }

}
