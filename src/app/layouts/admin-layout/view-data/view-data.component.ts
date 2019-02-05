import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Constant } from "assets/data/constant";
import { CommonService } from "app/service/common.service";
import { NgxSpinnerService } from 'ngx-spinner';

import {MatPaginator, MatTableDataSource, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { BaseModalCompoent } from '../base-modal.component';

declare var jquery: any;
declare var $: any;

const ELEMENT_DATA: any[] = [
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD:1000},  
];



@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent extends BaseModalCompoent implements OnInit{
  filterArray: { 'property': string; 'value': string; }[];
  optionsArray: any = [];
  BankNameArray: { 'Name': string; 'value': string; }[];
  ProductArray: { 'Name': string; 'value': string; }[];
  showDiv:any;
  bankName:any;
  productName:any;

  isBtnDisabled: boolean = true;

  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showEmployeeFilter: boolean = false;
  pageNo: any = 1;
  pageArray=[0];
  updatedFlag: any;
  constructor(public bottomSheetRef: MatBottomSheetRef<BaseModalCompoent>,
            public common: CommonService, public spinner: NgxSpinnerService,
             private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    super(bottomSheetRef, bottomSheet);
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
        'value': 'card'
      }

    ]


  }

  
  openBottomSheet(element): void {
    this.spinner.show();
    console.log('element', element);
    let URL= Constant.showDetailData;
    let data = {"id":element.id}
    this.common.postDataService(URL, data).subscribe((resp:any)=>{
      console.log(resp);

      this.spinner.hide();1111
      
    this.bottomSheet.open(BaseModalCompoent, {
      data: resp.data,
    });
    })
  }
  onChange(event) {
    console.log('Event', event);
    this.spinner.show();
    if (event === 'Employee') {
     
    }
    this.spinner.hide();

  }

  ngOnInit() {
  }

  showMoreData(){
    $("#conformationModal").modal('show');
  }

  onSubmit(flag){
    this.updatedFlag = flag;
    this.spinner.show();
    let URL = Constant.showData;
    let data = {
      'bank':this.bankName,
      'loanType':this.productName,
      'limit':this.pageNo,
      'search':'',
      'duplicate': this.updatedFlag
  }
console.log(data);

   this.common.postDataService(URL, data).subscribe((result:any)=>{
      console.log("aaaaaa",Math.floor(result.count/100) );
      
      let keyArray= [];
       Object.keys(result.data[1]).forEach((key)=>{
        if( key !=='count' )
          keyArray.push(key)
       })
       keyArray.push("Action")
       console.log(this.dataSource.data);
       
       this.displayedColumns = keyArray;
       this.dataSource =result.data; 
       console.log(this.dataSource.data);

       this.pageArray = Array.from(Array(Math.floor(result.count/100)), (_,i) => i+1);
       this.spinner.hide();
    })
  }


  getUpdate(event){
    console.log('EEE',event.pageSize);
    this.pageNo = event.pageSize;
    this.onSubmit( this.updatedFlag);
  }
  advanceSearch(){
    this.showDiv=!this.showDiv;
  }


  employeeCheck(ev){
    console.log(ev);
    
     this.showEmployeeFilter = !this.showEmployeeFilter;
    if (this.optionsArray.length === 0) {
      let URL = Constant.getEmpDetails;
      this.common.getData(URL).subscribe((resp: any) => {
        this.optionsArray = resp.response.filter(obj => obj.role !== 'admin');
      });
    }

  }
  showData(){
    console.log(this.bankName, this.productName);
    
    if(typeof this.bankName !== 'undefined' && typeof this.productName !== 'undefined' !){
      this.isBtnDisabled = false;
    }
  }

}
