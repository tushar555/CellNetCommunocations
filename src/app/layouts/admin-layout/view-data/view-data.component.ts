import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Constant } from 'assets/data/constant';
import { CommonService } from 'app/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

import {MatPaginator, MatTableDataSource, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { BaseModalCompoent } from '../base-modal.component';
import { ExportToCsv } from 'export-to-csv';

declare var jquery: any;
declare var $: any;

const ELEMENT_DATA: any[] = [
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
  {account: 1234567, full_name: 'Amey Marathe', msd_cur_bal: 23000, principle_bal: 500000, DPD: 1000},
];



@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent extends BaseModalCompoent implements OnInit {
  filterArray: { 'property': string; 'value': string; }[];
  optionsArray: any = [];
  BankNameArray: { 'Name': string; 'value': string; }[];
  ProductArray: { 'Name': string; 'value': string; }[];
  showDiv: any;
  bankName: any;
  productName: any;

  isBtnDisabled = true;

  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showEmployeeFilter = false;
  pageNo: any = 1;
  pageArray = [0];
  selectedFlag: any;
  detailedArray: any;
  empName: any = '';
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
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
    const URL = Constant.showDetailData;
    const data = {'id': element.id}
    this.common.postDataService(URL, data).subscribe((resp: any) => {
      console.log(resp);

      this.spinner.hide();

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

  showMoreData() {
    $('#conformationModal').modal('show');
  }

  onSubmit(flag) {

    this.spinner.show();
    const URL = Constant.showData;
    const data = {
      'bank': this.bankName,
      'loanType': this.productName,
      'limit': this.pageNo,
      'search': '',
      'duplicate': flag,
      'empName': this.empName
  }
console.log('HELL', data);

  this.selectedFlag = flag;
   this.common.postDataService(URL, data).subscribe((result: any) => {
    console.log('FLAG', result);
    if (result.data.length === 0) {
      this.common.showSnackbar({ 'status': 'No Record Found!' })

    } else {
      this.detailedArray = result.data
      const keyArray = [];
      Object.keys(result.data[1]).forEach((key) => {
       if ( flag !== '') {
         keyArray.push(key)
       } else if (key !== 'count') {
         keyArray.push(key)
       }

      })
      keyArray.push('Action')

      this.displayedColumns = keyArray;

        if ( flag === 'duplicate') {
           this.onDuplicateClick(result);
        } else {
           this.onShowDataClick(result);
        }

    }

       this.spinner.hide();
    })
  }

  onShowDataClick(result) {
    this.dataSource = result.data;
    console.log('LLLL', this.dataSource);

    this.pageArray = Array.from(Array(Math.floor(result.count / 100)), (_, i) => i + 1);
  }

  onDuplicateClick(result) {
    console.log(result.data);
    const newArray = result.data ;//.filter(obj => obj.count > 0);

    this.dataSource = newArray;
    this.pageArray = Array.from(Array(Math.floor(result.count / 100)), (_, i) => i + 1);

  }

  exportCSV() {
    if (this.detailedArray) {
      const csvExporter = new ExportToCsv(this.options);

      csvExporter.generateCsv(this.detailedArray);
    } else {
      this.common.showSnackbar({ 'status': 'No Record Found!' })

    }

  }

  getUpdate(event) {
    console.log('EEE', event.pageSize);
    this.pageNo = event.pageSize;
    this.onSubmit( this.selectedFlag);
  }
  advanceSearch() {
    this.showDiv = !this.showDiv;
    this.showEmployeeFilter = !this.showEmployeeFilter;
    if (this.optionsArray.length === 0) {
      const URL = Constant.getEmpDetails;
      this.common.getData(URL).subscribe((resp: any) => {
        this.optionsArray = resp.response.filter(obj => obj.role !== 'admin');
      });
    }
  }



  showData() {
    console.log(this.bankName, this.productName);

    if (typeof this.bankName !== 'undefined' && typeof this.productName !== 'undefined' !) {
      this.isBtnDisabled = false;
    }
  }

}
