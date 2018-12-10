import { Component } from '@angular/core';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMsg: any;
  constructor(public common: CommonService) {
    this.common.errorMsg.subscribe((message) => {
      this.errorMsg = message;
    });

  }
}
