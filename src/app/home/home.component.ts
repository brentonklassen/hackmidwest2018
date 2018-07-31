import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Headers } from '@angular/http';
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  venueName: string = '...';
  finishedLoading: boolean = false;
  headers: Headers;
  tribeSecretQuestion = '?';
  tribeSecretAnswer = '';
  userAnswer = '';
  uniqueName;

  constructor(private apiService: ApiService, private router: Router) {
    const ___this = this;
    console.log('getting location...');
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        console.warn('we need your location');
        return;
      }
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://safe-garden-46528.herokuapp.com/foursquare/currentlocation?lat=${lat}&long=${lon}`
      apiService.getApiResponse(url).subscribe(response => {

        let venues = response.response.venues;

        const headerDict = {
          'Authorization': 'Basic U0tkNTM1ZTZjNTBiYTJmZWEyNTJlNTQwNTE1MmI4YTYxMjo4NEI4RzJOMjM3NGRJUzlGdTNaVzVVMGFiamVDSEhPYQ=='
        };
        ___this.headers = new Headers(headerDict);

        apiService.getApiResponse('https://chat.twilio.com/v2/Services/ISd8248562eba148a1b7033719df90b109/Channels', this.headers).subscribe((response) => {

          for (let venue of venues) {

            ChannelLoop:
            for(let channel of response.channels) {
              if(channel.attributes === '{}') {
                continue ChannelLoop;
              }
              let channelAttributes = JSON.parse(channel.attributes);
              if(channelAttributes.location === undefined) {
                continue ChannelLoop;
              }
              let channelLocation = channelAttributes.location;
              console.log('checking this channel location', channelLocation, 'against this venu', venue.name);
              if (channelLocation === venue.name) {
                ___this.venueName = venue.name;
                ___this.tribeSecretQuestion = channelAttributes.question;
                ___this.tribeSecretAnswer = channelAttributes.answer;
                ___this.uniqueName = channel.unique_name;
                console.log('found matching location:', channelAttributes.location);
                break;
              }
            }
            if (___this.venueName) {
              break;
            }
          }
          ___this.finishedLoading = true;
          if (!___this.venueName) {
            console.warn('no channel available here');
          }    
        });
      });
    });
  }

  ngOnInit() {
  }

  verifyAnswer() {
    const ___this = this;
    if (___this.userAnswer === ___this.tribeSecretAnswer) {
      console.log('Success!');
      ___this.router.navigate(['chat'], { queryParams: { channelName: ___this.uniqueName } });
    }
    else {
      console.warn('wrong answwer');
    }
  }

}
