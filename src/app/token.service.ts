import { ApiService } from './api.service';
import { Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable'


@Injectable()
export class TokenService {

  public token: string;
  public identity: string;

  constructor(private apiService: ApiService) {
  }

   getTokenInfo(): Observable<any> {
     const _this = this;
     const url = `https://safe-garden-46528.herokuapp.com/token`;

     if (_this.token === undefined) {
      return this.apiService.getApiResponse(url);
     } else {
      return new Observable((observer) => {
        observer.next(_this);
        observer.complete();
      });
    }
  }
}
