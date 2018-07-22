import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  venueName: string = '...';
  finishedLoading: boolean = false;

  constructor(private apiService: ApiService) {
    const _this = this;
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `http://localhost:3000/foursquare/currentlocation?lat=${lat}&long=${lon}`
      apiService.getApiResponse(url).subscribe(response => {
        _this.venueName = response.response.venues[0].name;
        _this.finishedLoading = true;
      })
    });
  }

  ngOnInit() {
  }

}
