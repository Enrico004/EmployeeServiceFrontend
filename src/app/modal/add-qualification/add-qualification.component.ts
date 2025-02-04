import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {QualificationService} from "../../service/qualification.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {QualificationDto} from "../../model/qualificationDto";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormField, MatInput, MatDialogActions, MatButton],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent {
  establishedQualifications$: Observable<QualificationDto[]>;


  constructor(
    private qualificationService: QualificationService,
    private dialogRef: MatDialogRef<AddQualificationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: QualificationDto)
  {
    dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        dialogRef.close('cancel');
      } else if (event.key === "Enter") {
        dialogRef.close(JSON.stringify({
          method: 'accept',
          data: this.addQualificationForm.value }));
      }
    });
    this.establishedQualifications$ = this.qualificationService.getAllQualifications();
  }

  save() {
    this.dialogRef.close(JSON.stringify({
      method: 'accept',
      data: this.addQualificationForm.value }));
  }

  close() {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  addQualificationForm: FormGroup = new FormGroup({
    skill: new FormControl('')
  });
}
