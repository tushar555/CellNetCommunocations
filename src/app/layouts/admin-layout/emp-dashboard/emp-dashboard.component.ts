import { Component, OnInit } from '@angular/core';
import { CommonService } from "app/service/common.service";
import { Constant } from "assets/data/constant";
import { NgxSpinnerService } from 'ngx-spinner';
import { Router} from '@angular/router';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnInit {
  empListArray: any;
  originalEmpArray: any;

  constructor(public common: CommonService, public spinner: NgxSpinnerService, public router:Router) { }


  ngOnInit() {
    this.spinner.show();

    let URL = Constant.getEmpDetails;
    this.common.getData(URL).subscribe((resp: any) => {
      console.log(resp);
      this.empListArray = resp.response;
      this.originalEmpArray = resp.response;
      
      this.spinner.hide();

    })
  }

  fillFeddback(){
    alert('ALERT');
    this.router.navigate(['/cellnet/feedback-form']); 
  }

}

