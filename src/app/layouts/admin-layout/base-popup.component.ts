import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
    template:`
    <div mat-dialog-content>
      <p>Your Data has been uploded.</p>
     
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
      <button mat-button mat-dialog-close="show_data" cdkFocusInitial>Show Data</button>
    </div>
    `,
    selector:`<base-popup></base-popup>`
})
export class BasePopupCompoent{
    constructor(
        public dialogRef: MatDialogRef<BasePopupCompoent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
    
}