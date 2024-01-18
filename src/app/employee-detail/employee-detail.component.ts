import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {EmployeeService} from "../service/employee.service";
import {FormsModule} from "@angular/forms";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
  //@Input()employee!: EmployeeWithSkill;
  route: ActivatedRoute = inject(ActivatedRoute);
  employeeService: EmployeeService = inject(EmployeeService);
  employee!: EmployeeWithSkill;


  constructor() {
    const employeeId: number = parseInt(this.route.snapshot.params['id'], 10);
    this.employeeService.getEmployeeById(employeeId).subscribe(s => this.employee = s);
  }

}
