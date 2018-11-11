import { Component, OnInit } from '@angular/core';
import { Constant } from "assets/data/constant";
import { CommonService } from "app/service/common.service";

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  filterArray: { 'property': string; 'value': string; }[];
  optionsArray: any = [];

  constructor(public common: CommonService) {
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
  }

  onChange(event) {
    console.log('Event', event);
    if (event === 'Employee') {
      if (this.optionsArray.length === 0) {
        let URL = Constant.getEmpDetails;
        this.common.getData(URL).subscribe((resp: any) => {
          this.optionsArray = resp.response.filter(obj => obj.role !== 'admin');
        });
      }

    }

  }

  ngOnInit() {
  }

}
