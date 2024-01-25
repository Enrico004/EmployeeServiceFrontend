import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  item:string;

  constructor(private dialogRef:MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA)parameters:any) {
    this.item=parameters.parameter;
    console.log(parameters)
  }

  confirm(){
    console.log('Send confirm')
    this.dialogRef.close(JSON.stringify({method:'confirm'}))
  }

  cancel(){
    console.log('Send cancel')
    this.dialogRef.close(JSON.stringify({method:'cancel'}))
  }
}
