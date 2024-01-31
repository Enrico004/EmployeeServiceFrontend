import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {QualificationDto} from "../../model/qualificationDto";
import {QualificationService} from "../../service/qualification.service";
import {Observable} from "rxjs";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatDialogTitle, MatDialogContent, MatFormField, MatInput, MatSelect, MatOption, MatDialogActions, MatButton],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  qualification$: Observable<QualificationDto[]>;
  selectedQualifications: QualificationDto[];

  constructor(
    private qualificationService: QualificationService,
    private dialogRef: MatDialogRef<AddEmployeeComponent>) {

    dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        dialogRef.close('cancel');
      } else if (event.key === "Enter") {
        dialogRef.close(JSON.stringify({
          method: 'accept',
          data: this.addEmployeeForm.value }));
      }
    });

    this.qualification$ = this.qualificationService.getAllQualifications();
    this.selectedQualifications =[];
  }

  save() {
    this.dialogRef.close(JSON.stringify({
      method: 'accept',
      data: this.addEmployeeForm.value}));
  }

  close() {
    this.dialogRef.close(JSON.stringify({method: 'cancel'}));
  }

  addEmployeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    postcode: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    skillSet: new FormControl('')
  });
}
