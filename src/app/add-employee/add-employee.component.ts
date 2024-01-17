import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeService} from "../service/employee.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EmployeeWithSkillID} from "../model/EmployeeWithSkillID";
import {RouterLink} from "@angular/router";
import {Qualification} from "../model/qualification";
import {QualificationService} from "../service/qualification.service";
import {Observable} from "rxjs";
import {QualificationId} from "../model/qualificationId";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  qualification$: Observable<Qualification[]>;
  selectedQualifications: Qualification[];

  constructor(private employeeService: EmployeeService, private qualificationService: QualificationService) {
    this.qualification$ = this.qualificationService.getAllQualifications();
    this.selectedQualifications = new Array();
      /*
      .subscribe(s => {
      this.qualification$.shift();
      this.qualification$.concat(s);

    s.forEach((element) => {
      this.qualification$.unshift(element);
      this.qualification$.a
    })
    })
      */
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
    let qualifi: number[] = new Array();
    this.selectedQualifications.forEach((element) => {
      // @ts-ignore
      qualifi.unshift(element.id)
    })
    //let qualifi = new QualificationId(this.selectedQualifications)

    let employee = new EmployeeWithSkillID(
      this.addEmployeeForm.value.lastName ?? '',
      this.addEmployeeForm.value.firstName ?? '',
      this.addEmployeeForm.value.street ?? '',
      this.addEmployeeForm.value.city ?? '',
      this.addEmployeeForm.value.postcode ?? '',
      this.addEmployeeForm.value.phone ?? '',
      qualifi
    );
    this.employeeService.postEmployee(employee).subscribe(data => console.log(JSON.stringify(data)));
  }

  addQualification() {
    //this.selectedQualifications.push(qual);
    let select = document.getElementById('skillSetSelect')!;
    // @ts-ignore
    this.selectedQualifications.unshift(new Qualification(select.options[select.selectedIndex].text, select.value));
  }
}
