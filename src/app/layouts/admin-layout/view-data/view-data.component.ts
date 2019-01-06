import { Component, OnInit } from '@angular/core';
import { Constant } from "assets/data/constant";
import { CommonService } from "app/service/common.service";
import { NgxSpinnerService } from 'ngx-spinner';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  filterArray: { 'property': string; 'value': string; }[];
  optionsArray: any = [];
  BankNameArray: { 'Name': string; 'value': string; }[];
  ProductArray: { 'Name': string; 'value': string; }[];
  showDiv:any;
  bankName:any;
  productName:any;

  constructor(public common: CommonService, public spinner: NgxSpinnerService) {
    this.filterArray = [
      {
        'property': 'Employee Name',
        'value': 'Employee'
      },
      {
        'property': 'Client',
        'value': 'Client'
      }
    ]

    this.BankNameArray = [
      {
        'Name': 'ICICI',
        'value': 'icici'
      },
      {
        'Name': 'Yes Bank',
        'value': 'yes_bank'
      },
      {
        'Name': 'HDFC Bank',
        'value': 'hdfc_bank'
      },
      {
        'Name': 'Bajaj Finserve',
        'value': 'bajaj_finserve'
      }
    ]

    this.ProductArray = [
      {
        'Name': 'Personal Loans',
        'value': 'personal_loan'
      },
      {
        'Name': 'Home Loans',
        'value': 'home_loan'
      },
      {
        'Name': 'Auto Loans',
        'value': 'auto_loan'
      },
      {
        'Name': 'Credit Cards',
        'value': 'cc'
      }

    ]

  }

  onChange(event) {
    console.log('Event', event);
    this.spinner.show();
    if (event === 'Employee') {
      if (this.optionsArray.length === 0) {
        let URL = Constant.getEmpDetails;
        this.common.getData(URL).subscribe((resp: any) => {
          this.optionsArray = resp.response.filter(obj => obj.role !== 'admin');
        });
      }

    }
    this.spinner.hide();

  }

  ngOnInit() {
  }

  showMoreData(){
    $("#conformationModal").modal('show');
  }

  showData(){
    console.log(this.bankName, this.productName);
    
    if(typeof this.bankName !== 'undefined' && typeof this.productName !== 'undefined' !){
      console.log('trueee');
      
      this.showDiv = true;
    }
  }

}
