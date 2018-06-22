import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataserviceService {

  constructor(public http: Http) {
    console.log("data service connected");
   }

  apiurl: string = 'http://localhost:8000/';

  get(url) {
    console.log("in get  ", url);

    return this.http.get(this.apiurl + url)
      .map(res =>
        res.json()
      );
  }

  post(url, body) {
    console.log("Body in post",body);
    return this.http.post(this.apiurl + url, body)
      .map(res => res.json());
  } 
  getParams(url, params) {
    // let token = localStorage.getItem('_au_token');
    let opts = new RequestOptions();
    opts.params = params;

    return this.http.get(this.apiurl + url, opts)
      .map(res => res.json());
  }

}
