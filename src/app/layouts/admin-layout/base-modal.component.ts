import {Component, Inject} from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';


@Component({
    template:`
    <mat-nav-list>
        <div class="row">
          <div class="col col-md-6">
              <a mat-list-item >
                <span mat-line>Account No.</span>
                <span mat-line>{{data.account}}</span>
              </a>
            </div>   
          <div class="col col-md-6">
              <a mat-list-item >
                <span mat-line>Name.</span>
                <span mat-line>{{data.full_name}}</span>
              </a> 
          </div>
        </div>
        <div class="row">
            <div class="col col-md-6">
                <a mat-list-item >
                  <span mat-line> MSD Current balance</span>
                  <span mat-line>{{data.msd_cur_bal}}</span>
                </a>
            </div>   
            <div class="col col-md-6">
                <a mat-list-item >
                  <span mat-line> PRINCIPAL BALANCE</span>
                  <span mat-line>{{data.principle_bal}}</span>
                </a> 
            </div>
        </div>
        <div class="row">
            <div class="col col-md-6">
                <a mat-list-item >
                  <span mat-line>DPD</span>
                  <span mat-line>{{data.DPD}}</span>
                </a> 
            </div>
            <div class="col col-md-6">
            <a mat-list-item >
              <span mat-line> PRINCIPAL BALANCE</span>
              <span mat-line>{{data.principle_bal}}</span>
            </a>
        </div>   
        </div>
    
</mat-nav-list>

    `,
    selector:`<base-modal></base-modal>`
})
export class BaseModalCompoent{
    constructor(public bottomSheetRef: MatBottomSheetRef<BaseModalCompoent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
                  console.log('ELELEMEME',data);
                  
                }
    
    
}   