import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constant } from '../../assets/data/constant';
import { LocalStorageService } from "ngx-store/src/ngx-store";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient, public localstorage: LocalStorageService) { }


  doLogin(url:any, data:any) {
    console.log('URL', url);
    console.log('data', data);

   // let headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    // return this.http.get(url);
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.post(url, data, { headers: headers });
  }

  doLogout() {
    this.localstorage.clear();
  }
  loalDoLogin(url:any) {
    return this.http.get(url);
  }
}
