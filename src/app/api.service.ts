import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getApiResponse(url: string) {
  return this.http.get(url).map((response: Response) =>  response.json());
  }

}
