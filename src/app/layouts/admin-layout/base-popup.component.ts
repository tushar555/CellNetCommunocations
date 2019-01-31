import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
    template:`<h1 mat-dialog-title>Hi {{data.name}}</h1>
    <div mat-dialog-content>
      <p>What's your favorite animal?</p>
     
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Show Data</button>
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