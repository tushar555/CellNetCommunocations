import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
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

  constructor(public formbuilder: FormBuilder) {

    this.initialForm = this.formbuilder.group({
      'bankName': ['', Validators.required],
      'productName': ['', Validators.required]
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


  }

  ngOnInit() {
  }

  uploadCSV() {
    this.showSearchData = true;
  }

  selectFile(eve) {
    console.log(eve.target.files[0].name.split('.').pop() == 'xlsx');
    this.file = eve.target.files[0]


    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let j = 0;
      this.titleArray = [];
      this.infoArray = [];
      //console.log(worksheet);
      for (var key in worksheet) {
        // if (j >= 120 && j !== 0) {
        //   this.infoArray.push(worksheet[key]);
        // } else if (j !== 0) {
        //   this.titleArray.push(worksheet[key]);
        // }
        // j++

        console.log('WorkSheet', worksheet[key]);
        j++
      }
      console.log(j);

      // for (let p = 0; this.titleArray.length - this.infoArray.length; p++) {
      //   this.infoArray.push({ v: "" })
      // }
      console.log('Title', this.titleArray);
      console.log('extraData', this.infoArray);

    }

    fileReader.readAsArrayBuffer(this.file);
    //  console.log('JJJJJ', fileReader.readAsArrayBuffer(this.file));

    if (eve.target.files[0].name.split('.').pop() != 'xlsx' && eve.target.files[0].name.split('.').pop() != 'xls' && eve.target.files[0].name.split('.').pop() != 'csv') {
      this.notCorrectFile = true;
    } else {
      this.notCorrectFile = false;
      this.fileSelected = true;
    }
  }
}
