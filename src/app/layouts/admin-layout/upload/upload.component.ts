import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
// import * as XLSX from 'ts-xlsx';
import { CommonService } from "app/service/common.service";
import { Constant } from "assets/data/constant";
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestOptions } from '@angular/http';
import { BasePopupCompoent } from '../base-popup.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends BasePopupCompoent implements OnInit {
  formData: any;
  titleArray: any[];
  infoArray: any[];

  notCorrectFile: any = false;
  fileSelected: any = false;
  BankNameArray: any = [];
  ProductArray: any = [];
  showSearchData: any = false;
  initialForm: any;
  productName: any;
  bankName: any;

  arrayBuffer: any;
  file: File;
  FileArray: any[];
  MonthArray:any [];
  YearArray: any[];
  date = new Date();
  constructor(public spinner: NgxSpinnerService, public formbuilder: FormBuilder,
               public common: CommonService,  public dialogRef: MatDialogRef<BasePopupCompoent>,
               @Inject(MAT_DIALOG_DATA) public data:any, public dialog: MatDialog, public route:Router) {
    super(dialogRef,MAT_DIALOG_DATA);
    this.initialForm = this.formbuilder.group({
      'bankName': ['', Validators.required],
      'productName': ['', Validators.required],
      'fileType':['', Validators.required],
      'month':['',Validators.required],
      'year':['',Validators.required]
    })
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

    this.FileArray = [
      {
        'Name': 'Raw Data',
        'value': 'raw'
      },
      {
        'Name': 'Allocation file',
        'value': 'allocation'
      } 
    ]
    this.createYearArray();

    this.createMonthsArray();
 
  }

  createMonthsArray(){
    this.MonthArray = ['January', 'February', 'March', 'April', 'March', 'May', 'June', 'July', 'Augast', 'September', 'October', 'November', 'December' ]

  }

  getMonths(year){
    debugger;
 
    this.createMonthsArray();
    if(year.value == this.date.getFullYear())
      this.MonthArray = this.MonthArray.splice(0,this.date.getMonth()+1); 
  }
  createYearArray(){
   let temp = [];
   for(let i=2010; i<= this.date.getFullYear();i++){
    temp.push(i);  
    // this.YearArray.push(i);
    //this.YearArray.push(i);
   } 
   this.YearArray = temp;
  }
  ngOnInit() {
  }

  uploadCSV(event) {
    this.spinner.show();
    var URL= '';
    // this.showSearchData = true;
    let file = this.file;//event.srcElement.files[0];
    //let URL = Constant.uploadFile;
    if(this.initialForm.value.fileType === 'raw') 
        URL = Constant.uploadFile;
    else 
        URL = ''; 

    let data =this.formData;
    console.log('THISSS', JSON.stringify(JSON.stringify(this.initialForm.value)));
    
    this.common.postDataService(URL, data).subscribe((resp) => {
   
      this.openDialog();
      this.spinner.hide();
    }, (error) => {
      console.log('Error', error);
      this.spinner.hide();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BasePopupCompoent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result=='show_data'){
        this.route.navigate(['/cellnet/view-data'])
      }
     // this.animal = result;
    });
  }

  selectFile(eve) {
    console.log(eve.target.files[0].name.split('.').pop() == 'xlsx');
    this.file = eve.target.files[0];
    // alert('HELLoo', )
    this.formData = new FormData();
   // this.formData.append('file',)
  // debugger;
   this.formData.append('selectFile', this.file, this.file.name);
   this.formData.append('data', JSON.stringify(this.initialForm.value) )
  
    if (eve.target.files[0].name.split('.').pop() != 'xlsx' && eve.target.files[0].name.split('.').pop() != 'xls' && eve.target.files[0].name.split('.').pop() != 'csv') {
      this.notCorrectFile = true;
    } else {
      this.notCorrectFile = false;
      this.fileSelected = true;
    }
  }
}
