import { Component, OnInit } from '@angular/core';
import { CommonService } from "app/service/common.service";
import { Constant } from "assets/data/constant";

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})
export class EmpDetailsComponent implements OnInit {
  originalEmpArray: any;
  empListArray: any;

  constructor(public common: CommonService) { }

  ngOnInit() {
    let URL = Constant.getEmpDetails;
    this.common.getData(URL).subscribe((resp: any) => {
      console.log(resp);
      this.empListArray = resp.response;
      this.originalEmpArray = resp.response;
      this.changeEmployee('admin');
    })
  }

  changeEmployee(role) {
    this.empListArray = this.originalEmpArray;
    this.empListArray = this.empListArray.filter(obj => obj.role == role)
  }

  edit() {
    this.common.showSnackbar({ 'status': 'Coming soon' })
  }

  delete() {
    this.common.showSnackbar({ 'status': 'Coming soon' })
  }
}
