import {Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {EmployeeService} from "../../service/employee.service";
import {QualificationService} from "../../service/qualification.service";
import {QualificationDto} from "../../model/qualificationDto";
import {catchError, Observable, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {EmployeeSkillSetDto} from "../../model/employeSkillSetDto";
import {MatDialog} from "@angular/material/dialog";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";

@Component({
  selector: 'app-edit-employee-qualification',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent],
  templateUrl: './edit-employee-qualification.component.html',
  styleUrl: './edit-employee-qualification.component.css'
})
export class EditEmployeeQualificationComponent {

  id:string='';
  qualificationList: Observable<QualificationDto[]>;
  employee:Observable<EmployeeSkillSetDto>;
  constructor(private employeeService:EmployeeService, private qualificationService:QualificationService,
              private route:ActivatedRoute, private location:Location,
              private dialog:MatDialog, private viewService:ViewService) {
    this.qualificationList=this.qualificationService.getAllQualificationDto();
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log('EmployeeId: '+this.id)
    });
    this.employee=this.employeeService.getQualificationForEmployee(this.id);
    this.viewService.swapView(View.OTHER);
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
    const dialogRef=this.dialog.open(AddQualificationComponent,{
      disableClose:true,
      autoFocus:true
    })

    dialogRef.afterClosed().subscribe(result=>{
      const object=JSON.parse(result)
      if(object&&object.method=='accept'){
        this.qualificationService.postQualification(object.data).subscribe(()=>{
          this.qualificationList=this.qualificationService.getAllQualifications();
        })
      }
    })
  }


}
