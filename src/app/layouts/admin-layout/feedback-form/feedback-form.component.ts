import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  EmpType: any;
  custName:any;
  newNum:any;
  cardNo:any;
  callingCode:any;
  callingFeedback:any;
  tracedAdd:any;
  newAdd:any;
  area:any;
  emailId:any;
  year:any
  faceBook:any;
  lastActive:any;
  naukariResume1:any;
  naukariResume2:any;
  refnaukariResume1:any
  refnaukariResume2:any;
  monster:any;
  refMonster:any;
  timesJob:any;
  refTimesJob:any;
  piplSearch:any;
  linkedIn:any;
  lpg:any;
  google:any;
  matchingDetails:any

  constructor(public localstorage:LocalStorageService) { }

  ngOnInit() {
    this.EmpType = this.localstorage.get('userDetails').role;
    
  }
  submitForm(){
    
  }
  
}
