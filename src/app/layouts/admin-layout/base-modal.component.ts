import {Component, Inject} from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';


@Component({
    templateUrl:`./base-modal.html`,
    selector:`<base-modal></base-modal>`
})
export class BaseModalCompoent{
    constructor(public bottomSheetRef: MatBottomSheetRef<BaseModalCompoent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
                  console.log('ELELEMEME',data);
                  
                }
    
    
}   