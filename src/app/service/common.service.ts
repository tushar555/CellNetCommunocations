import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from "rxjs";
@Injectable()
export class CommonService {

  errorMsg: any;
  public messageSource = new BehaviorSubject<string>("Message");


  constructor(public http: HttpClient) {
    this.errorMsg = this.messageSource.asObservable();
  }

  getData(url) {
    return this.http.get(url);
  }

  postDataService(url, data) {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    //let options = { headers: headers };
    return this.http.post(url, data);
  }

  showSnackbar(error) {
    let conditionArray = [504, 0, undefined, null];

    // switch (true) {
    //   case (conditionArray.indexOf(error.status) > 0):
    //     this.messageSource.next('Please check your Internet Connection!');
    //     break;
    //   case (error.status === 401):
    //     this.messageSource.next('Your session has been expired! Please login again.');
    //     this._router.navigate(['/login']);
    //     break;
    //   case (error.status === 'coming_soon'):
    //     this.messageSource.next('Coming Soon')
    //     break;
    //   default:
    //     this.messageSource.next(error.status)
    //     break;
    // }

    this.messageSource.next(error.status)

    const x = document.getElementById('snackbar')
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
  }

}
