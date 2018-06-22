import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  result:any;
  constructor(public http: Http) {
    console.log("data service connected");
   }

  apiurl: string = 'http://localhost:8000';

  getUsers() {
    return this.http.get(this.apiurl + "/api/userLogin")
      .map(result => this.result = result.json().data);
  }

  get(url) {
    console.log("in get  ", this.apiurl + url);

    return this.http.get(this.apiurl + url)
      .map(res =>
        res.json()
      );
  }


}
