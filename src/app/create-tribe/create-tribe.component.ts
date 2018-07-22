import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TokenService } from '../token.service';
import {Router} from "@angular/router";


declare global {
  interface Window { Twilio: any; }
}

@Component({
  selector: 'app-create-tribe',
  templateUrl: './create-tribe.component.html',
  styleUrls: ['./create-tribe.component.css']
})
export class CreateTribeComponent implements OnInit {

  loadPlaces = false;
  tribeName;
  tribeQuestion;
  tribeAnswer;
  venues = [];
  lat;
  lon;
  selectedLocation;
  trustedUrl: SafeResourceUrl;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private tokenService: TokenService, private router: Router) {
    const _this = this;
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      // tslint:disable-next-line:max-line-length
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/view?key=AIzaSyAd6voAjl9w07t1Oi0cGpqFuSo0SCd7lGw&center=' + lat + ',' + lon + '&zoom=18');
      console.log(this.trustedUrl);

      const url = `http://localhost:3000/foursquare/currentlocation?lat=${lat}&long=${lon}`
      apiService.getApiResponse(url).subscribe(response => {
        _this.venues = response.response.venues.map(venue => venue.name);
        _this.venues = _this.venues.slice(0, 4);
        console.log(_this.venues);

      });
    });
  }

  ngOnInit() {
  }

  showPlaces() {
    this.loadPlaces = true;
  }

  createChannel() {
    const _this = this;
    console.log(_this.selectedLocation);

    _this.tokenService.getTokenInfo().subscribe(
      (response) => {
        const token = response.token;
      _this.tokenService.token = response.token;
      _this.tokenService.identity = response.identity;
      window.Twilio.Chat.Client.create(token).then(client => {
        client.createChannel({
          uniqueName: _this.tribeName,
          friendlyName: 'Non General Chat Channel'
        }).then( function(channel) {
          console.log('Created new channel:');
          console.log(channel);
          channel.updateAttributes({
            question : _this.tribeQuestion,
            answer : _this.tribeAnswer,
            location : _this.selectedLocation
          }).then(
            function(channelUpdated) {
                console.log(channelUpdated);
                _this.router.navigate(['chat'], { queryParams: { channelName: channelUpdated.state.uniqueName } });

            }
          );
        });
      });
      }
    );


  }


}
