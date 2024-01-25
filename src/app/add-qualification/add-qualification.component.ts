import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QualificationService} from "../service/qualification.service";
import {EmployeeService} from "../service/employee.service";
import {Qualification} from "../model/qualification";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent {

  qualifications:Qualification[]=[]
  constructor(private qualificationService:QualificationService,
              private employeeService:EmployeeService) {
  }
  ngOnInit(){

  }
}
