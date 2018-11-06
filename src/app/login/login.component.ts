import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from "@angular/forms";
import { Constant } from '../../assets/data/constant';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-store';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any
  constructor(public common: CommonService, public localstorage: LocalStorageService, public spinner: NgxSpinnerService, public router: Router, public formbuilder: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  localAuthLogin() {
    let url = Constant.localLogin;
    this.spinner.show();
    this.auth.loalDoLogin(url).subscribe((response: any) => {

      this.spinner.hide();
      if (response.message === 'Success') {
        //this.localstorage.set('userDetails', response.userDetails)
        let type = 'admin';
        this.spinner.hide();
        if (type == 'admin') {
          this.router.navigate(['/cellnet/admin-dashboard']);
        } else {
          this.router.navigate(['/cellnet/emp-dashboard']);
        }
      } else {
        this.spinner.hide();

      }
    }, (error) => {
      this.spinner.hide();
      console.log('error', error);
    })
  }


  authlogin() {
    this.spinner.show();
    let url = Constant.Login;

    //  this.router.navigate(['/cellnet/admin-dashboard']);
    console.log('response', JSON.stringify(this.loginForm.value));
    let data = { 'userName': this.loginForm.value.userName, 'password': this.loginForm.value.password }

    this.auth.doLogin(url, data).subscribe((response: any) => {
      console.log(response);

      if (response.responseMsg === 'Success') {
        this.localstorage.set('userDetails', response.userDetails)
        if (response.userDetails.role === 'admin') {
          this.router.navigate(['/cellnet/admin-dashboard']);
        } else {
          this.router.navigate(['/cellnet/emp-dashboard']);
        }
      } else {
        console.log('Something Went wrong');
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();

      console.log('error', error);
    })
  }
}
