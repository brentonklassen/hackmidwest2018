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
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      // tslint:disable-next-line:max-line-length
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/view?key=AIzaSyAd6voAjl9w07t1Oi0cGpqFuSo0SCd7lGw&center=' + lat + ',' + lon + '&zoom=18');

      const url = `https://safe-garden-46528.herokuapp.com/foursquare/currentlocation?lat=${lat}&long=${lon}`
      apiService.get(url).subscribe(response => {
        this.venues = response.response.venues.map(venue => venue.name);
        this.venues = this.venues.slice(0, 4);
        console.log('venues', this.venues);
      });
    });
  }

  ngOnInit() {
  }

  showPlaces() {
    this.loadPlaces = true;
  }

  createChannel() {
    console.log('selected location', this.selectedLocation);

    this.tokenService.getTokenInfo().subscribe((response) => {
      const token = response.token;
      this.tokenService.token = response.token;
      this.tokenService.identity = response.identity;
      window.Twilio.Chat.Client.create(token).then(client => {
        client.createChannel({
          uniqueName: this.tribeName,
          friendlyName: this.tribeName + ' @ ' + this.selectedLocation,
          attributes: {
            question : this.tribeQuestion,
            answer : this.tribeAnswer,
            location : this.selectedLocation
          }
        }).then((channelUpdated) => {
          console.log('updated', channelUpdated);
          this.router.navigate(['chat'], { queryParams: { channelName: channelUpdated.state.uniqueName } });
        });
      });
    });
  }

}
