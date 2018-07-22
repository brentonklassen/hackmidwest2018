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
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `http://localhost:3000/foursquare/currentlocation?lat=${lat}&long=${lon}`
      apiService.getApiResponse(url).subscribe(response => {
        ___this.venueName = response.response.venues[0].name;
        console.log(___this.venueName);
        const headerDict = {
          'Authorization': 'Basic U0tkNTM1ZTZjNTBiYTJmZWEyNTJlNTQwNTE1MmI4YTYxMjo4NEI4RzJOMjM3NGRJUzlGdTNaVzVVMGFiamVDSEhPYQ=='
        };
        ___this.headers = new Headers(headerDict);

      apiService.getApiResponse('https://chat.twilio.com/v2/Services/ISd8248562eba148a1b7033719df90b109/Channels', this.headers).subscribe(
        function (response) {

          for(let channel of response.channels) {
            if(channel.attributes !== '{}')
            {

              if(((JSON.parse(channel.attributes)).location) !== undefined)
              {
                console.log(___this.venueName);

                if(((JSON.parse(channel.attributes)).location) === ___this.venueName)
                {
                  ___this.tribeSecretQuestion = ((JSON.parse(channel.attributes)).question);
                  ___this.tribeSecretAnswer = ((JSON.parse(channel.attributes)).answer);
                  ___this.uniqueName = channel.unique_name;
                  console.log(((JSON.parse(channel.attributes)).location));

                }

              }



            }

          }


          // tslint:disable-next-line:no-eval
        }
      );
      ___this.finishedLoading = true;
      });
    });



    // tslint:disable-next-line:max-line-length



  }

  ngOnInit() {
  }

  verifyAnswer() {
    const ___this = this;
    if (___this.userAnswer === ___this.tribeSecretAnswer) {
console.log('Success!');
___this.router.navigate(['chat'], { queryParams: { channelName: ___this.uniqueName } });


    }

  }



}
