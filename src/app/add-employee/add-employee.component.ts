import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeService} from "../service/employee.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EmployeeWithSkillID} from "../model/EmployeeWithSkillID";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  constructor(private employeeService: EmployeeService) {
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
    let employee = new EmployeeWithSkillID(

      this.addEmployeeForm.value.lastName ?? '',
      this.addEmployeeForm.value.firstName ?? '',
      this.addEmployeeForm.value.street ?? '',
      this.addEmployeeForm.value.city ?? '',
      this.addEmployeeForm.value.postcode ?? '',
      this.addEmployeeForm.value.phone ?? '',
      //this.addEmployeeForm.value.skillSet ?? 0
    );
    this.employeeService.postEmployee(employee).subscribe(data => console.log(JSON.stringify(data)));
  }

}
