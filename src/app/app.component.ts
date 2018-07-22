import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TokenService, ApiService]
})
export class AppComponent {
  title = 'Nomad';
  constructor(tokenService: TokenService, apiService: ApiService) {
  }
}
