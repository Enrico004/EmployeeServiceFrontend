import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeService} from "../service/employee.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EmployeeWithSkillID} from "../model/EmployeeWithSkillID";
import {RouterLink} from "@angular/router";
import {Qualification} from "../model/qualification";
import {QualificationService} from "../service/qualification.service";
import {Observable} from "rxjs";
import {
  MAT_DIALOG_DATA,
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
export class AddEmployeeComponent implements OnInit{
  qualification$: Observable<Qualification[]>;
  selectedQualifications: Qualification[];


  description: string;
  /**
  form = this.formBuilder.group({
    description: [this.data.firstName, this.data.lastName, Validators.required],
    category: []
  })
    **/
  constructor(
    private employeeService: EmployeeService,
    private qualificationService: QualificationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data:EmployeeWithSkillID) {
    this.description = `${data.firstName}, ${data.lastName};`

    this.qualification$ = this.qualificationService.getAllQualifications();
    this.selectedQualifications =[];
  }
  ngOnInit() {

  }

  save() {
    this.dialogRef.close(this.addEmployeeForm.value);
  }

  close() {
    this.dialogRef.close();
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
