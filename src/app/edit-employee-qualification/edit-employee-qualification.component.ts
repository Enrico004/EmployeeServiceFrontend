import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeService} from "../service/employee.service";
import {QualificationService} from "../service/qualification.service";
import {QualificationDto} from "../model/qualificationDto";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-edit-employee-qualification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-employee-qualification.component.html',
  styleUrl: './edit-employee-qualification.component.css'
})
export class EditEmployeeQualificationComponent {

  qualificationList: Observable<QualificationDto[]>;
  constructor(private employeeService:EmployeeService,private qualificationService:QualificationService) {
    this.qualificationList=this.qualificationService.getAllQualificationDto();
  }


}
