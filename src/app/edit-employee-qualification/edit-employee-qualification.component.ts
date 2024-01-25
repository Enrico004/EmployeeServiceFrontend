import { Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {EmployeeService} from "../service/employee.service";
import {QualificationService} from "../service/qualification.service";
import {QualificationDto} from "../model/qualificationDto";
import {catchError, Observable, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeSkillSetDto} from "../model/employeSkillSetDto";
@Component({
  selector: 'app-edit-employee-qualification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-employee-qualification.component.html',
  styleUrl: './edit-employee-qualification.component.css'
})
export class EditEmployeeQualificationComponent {

  id:string='';
  qualificationList: Observable<QualificationDto[]>;
  employee:Observable<EmployeeSkillSetDto>;
  constructor(private employeeService:EmployeeService,private qualificationService:QualificationService,private route:ActivatedRoute,private location:Location,private router:Router) {
    this.qualificationList=this.qualificationService.getAllQualificationDto();
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log('EmployeeId: '+this.id)
    });
    this.employee=this.employeeService.getQualificationForEmployee(this.id);
  }

  removeQualification(qualification:string){
    console.log("Removing qualification")
    let oldSkillSetList=this.employee
    this.employee=this.employeeService.deleteQualificationForEmployee(this.id,qualification)
      .pipe(catchError(err => {
        console.log(err);
        this.employee=oldSkillSetList;
        return throwError(()=>err);
      }))

  }

  addQualification(qualification:QualificationDto){
    console.log("Adding qualification")
    let oldSkillSetList=this.employee;
    this.employee=this.employeeService.postQualificationForEmployee(this.id,qualification)
      .pipe(catchError(err => {
        console.log('Hallo')
        this.employee=oldSkillSetList;
        return throwError(()=>err);
      }))
  }

  goBack(){
    this.location.back();
  }

  createQualification(){
  }


}
