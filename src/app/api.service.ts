import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getApiResponse(url: string, headers?: Headers) {
  return this.http.get(url, {headers}).map((response: Response) =>  response.json());
  }

}
