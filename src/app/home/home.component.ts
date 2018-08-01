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
  wrongAnswer: boolean = false;
  gotLocation: boolean = false;
  headers: Headers;
  tribeSecretQuestion = '?';
  tribeSecretAnswer = '';
  userAnswer = '';
  uniqueName;

  constructor(private apiService: ApiService, private router: Router) {
    console.log('getting location...');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('got location!', location);
      if (!position) {
        console.warn('failed getting location');
        this.finishedLoading = true;
        return;
      }
      this.gotLocation = true;  
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://safe-garden-46528.herokuapp.com/foursquare/currentlocation?lat=${lat}&long=${lon}`
      apiService.get(url).subscribe(response => {

        let venues = response.response.venues;

        const headerDict = {
          'Authorization': 'Basic U0tkNTM1ZTZjNTBiYTJmZWEyNTJlNTQwNTE1MmI4YTYxMjo4NEI4RzJOMjM3NGRJUzlGdTNaVzVVMGFiamVDSEhPYQ=='
        };
        this.headers = new Headers(headerDict);

        apiService.get('https://chat.twilio.com/v2/Services/ISd8248562eba148a1b7033719df90b109/Channels', this.headers).subscribe((response) => {

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
                this.venueName = venue.name;
                this.tribeSecretQuestion = channelAttributes.question;
                this.tribeSecretAnswer = channelAttributes.answer;
                this.uniqueName = channel.unique_name;
                console.log('found matching location:', channelAttributes.location);
                break;
              }
            }
            if (this.venueName) {
              break;
            }
          }
          this.finishedLoading = true;
          if (!this.venueName) {
            console.warn('no channel available here');
          }    
        });
      });
    }, () => {
      console.warn('did not get location');
      this.finishedLoading = true;
  });
  }

  ngOnInit() {
  }

  verifyAnswer() {
    if (this.userAnswer.toLowerCase().includes(this.tribeSecretAnswer.toLowerCase())) {
      console.log('Success!');
      this.router.navigate(['chat'], { queryParams: { channelName: this.uniqueName } });
    }
    else {
      console.warn('wrong answwer');
      this.wrongAnswer = true;
      this.userAnswer = '';
    }
  }

}
