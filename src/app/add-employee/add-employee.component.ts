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

  saveEmployee(): void {
    let addedQualifications: number[] = [];
    this.selectedQualifications.forEach((element) => {
      // @ts-ignore
      addedQualifications.unshift(element.id)
    })


    let employee = new EmployeeWithSkillID(
      this.addEmployeeForm.value.lastName!,
      this.addEmployeeForm.value.firstName!,
      this.addEmployeeForm.value.street!,
      this.addEmployeeForm.value.city!,
      this.addEmployeeForm.value.postcode!,
      this.addEmployeeForm.value.phone!,
      addedQualifications
    );
    this.employeeService.postEmployee(employee).subscribe(data => {
      //window.globalEmployeeList.pipe(window.globalEmployeeList.unsift(data));
      console.log(JSON.stringify(data))
    });
  }

  addQualification() {
    //this.selectedQualifications.push(qual);
    let select = document.getElementById('skillSetSelect')!;
    // @ts-ignore
    this.selectedQualifications.unshift(new Qualification(select.options[select.selectedIndex].text, select.value));
  }

  checkInputs(){
    let firstname: string = this.addEmployeeForm.value.firstName!;
    let lastname: string = this.addEmployeeForm.value.lastName!;
    let street: string = this.addEmployeeForm.value.street!;
    let city: string = this.addEmployeeForm.value.city!;
    let postcode: string = this.addEmployeeForm.value.postcode!;
    let phone: string = this.addEmployeeForm.value.phone!;

    if (firstname.length > 0 && lastname.length > 0 && street.length > 0
      && city.length > 0 && postcode.length === 5 && phone.length > 0){
      this.saveEmployee();
    } else {
      // TODO: Warnung das irgendwelche Daten fehlen / Postcode.length != 5
    }
  }

  /* So würde ich es machen, wenn es überhaupt gebraucht werden würde...
  cancelCreation(){
    // Das überschreiben ist nicht notwendig, aber gut fürs gefühl :p
    this.addEmployeeForm.value.lastName = '';
    this.addEmployeeForm.value.firstName = '';
    this.addEmployeeForm.value.street = '';
    this.addEmployeeForm.value.city = '';
    this.addEmployeeForm.value.postcode = '';
    this.addEmployeeForm.value.phone = '';
    window.location.href = '/employee';
  }
   */
}
