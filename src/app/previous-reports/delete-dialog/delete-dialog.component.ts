import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FirebaseDate} from "../../../types/Report";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: {startDate: string | FirebaseDate, endDate: string | FirebaseDate},
      public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {
  }
}
