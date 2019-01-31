import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
// import * as XLSX from 'ts-xlsx';
import { CommonService } from "app/service/common.service";
import { Constant } from "assets/data/constant";
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestOptions } from '@angular/http';
import { BasePopupCompoent } from '../base-popup.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(public spinner: NgxSpinnerService, public formbuilder: FormBuilder,
               public common: CommonService,  public dialogRef: MatDialogRef<BasePopupCompoent>,
               @Inject(MAT_DIALOG_DATA) public data:any, public dialog: MatDialog) {
    super(dialogRef,MAT_DIALOG_DATA);
    this.initialForm = this.formbuilder.group({
      'bankName': ['', Validators.required],
      'productName': ['', Validators.required],
      'fileType':['', Validators.required]
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

  }

  ngOnInit() {
  }

  uploadCSV(event) {
    this.spinner.show();
    let URL= '';
    // this.showSearchData = true;
    let file = this.file;//event.srcElement.files[0];
    //let URL = Constant.uploadFile;
    if(this.formData.fileType === 'raw') 
        URL = Constant.uploadFile;
    else 
        URL = ''; 

    let data = Object.assign({}, this.formData);

    this.common.postDataService(URL, data).subscribe((resp) => {
      console.log('RESP', resp);
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
      console.log('The dialog was closed');
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


    // let fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   this.arrayBuffer = fileReader.result;
    //   var data = new Uint8Array(this.arrayBuffer);
    //   var arr = new Array();
    //   for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    //   var bstr = arr.join("");
    //   var workbook = XLSX.read(bstr, { type: "binary" });
    //   var first_sheet_name = workbook.SheetNames[0];
    //   var worksheet = workbook.Sheets[first_sheet_name];
    //   let j = 0;
    //   this.titleArray = [];
    //   this.infoArray = [];
    //   //console.log(worksheet);
    //   for (var key in worksheet) {
    //     // if (j >= 120 && j !== 0) {
    //     //   this.infoArray.push(worksheet[key]);
    //     // } else if (j !== 0) {
    //     //   this.titleArray.push(worksheet[key]);
    //     // }
    //     // j++

    //     console.log('WorkSheet', worksheet[key]);
    //     j++
    //   }
    //   console.log(j);

    //   // for (let p = 0; this.titleArray.length - this.infoArray.length; p++) {
    //   //   this.infoArray.push({ v: "" })
    //   // }
    //   console.log('Title', this.titleArray);
    //   console.log('extraData', this.infoArray);

    // }

    // fileReader.readAsArrayBuffer(this.file);
    //  console.log('JJJJJ', fileReader.readAsArrayBuffer(this.file));

    if (eve.target.files[0].name.split('.').pop() != 'xlsx' && eve.target.files[0].name.split('.').pop() != 'xls' && eve.target.files[0].name.split('.').pop() != 'csv') {
      this.notCorrectFile = true;
    } else {
      this.notCorrectFile = false;
      this.fileSelected = true;
    }
  }
}
