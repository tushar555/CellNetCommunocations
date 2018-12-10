import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public localstorage: LocalStorageService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.localstorage.get('userDetails') !== undefined && this.localstorage.get('userDetails') !== null) {
      return true
    } else
      return false
    //return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('HELLLO',this.localstorage.get('userDetails'));
    
    if (this.localstorage.get('userDetails') !== undefined && this.localstorage.get('userDetails') !== null) {
      return true
    } else{
      
      return false
      
    }
    // let roles = next.data["roles"] as Array<string>;
    // console.log('data roles : ' + roles);
    //   console.log(next);

    // if (this.localstorage.get('userDetails') !== undefined && this.localstorage.get('userDetails') !== null) {
    // if (roles !== undefined && this.localstorage.get('userDetails').EmpType == roles) {
    //   console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    //   return true
    // }
    // // else {
    // //   console.log('BBBBBBBBBBBBBBBBBBBBBBBbb');

    // //   return false
    // // }
    // //
    
    // } else {
    //console.log('aaalalalala');

    // return false
    // }
    //return true;
  }
}
