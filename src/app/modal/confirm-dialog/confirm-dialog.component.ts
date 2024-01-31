import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  item:string;

  constructor(private dialogRef:MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA)parameters:any) {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.cancel();
      }
    });
    this.item=parameters.name;
    console.log(parameters)
  }

  confirm(){
    console.log('Send confirm')
    this.dialogRef.close(JSON.stringify({method:'confirm',
      result: this.item
    }))
  }

  cancel(){
    console.log('Send cancel')
    this.dialogRef.close(JSON.stringify({method:'cancel'}))
  }
}
