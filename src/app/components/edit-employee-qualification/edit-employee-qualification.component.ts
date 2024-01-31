import {Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {EmployeeService} from "../../service/employee.service";
import {QualificationService} from "../../service/qualification.service";
import {QualificationDto} from "../../model/qualificationDto";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {EmployeeSkillSetDto} from "../../model/employeSkillSetDto";
import {MatDialog} from "@angular/material/dialog";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";
import {QualificationSortPipe} from "../../pipe/qualification-sort.pipe";
import {SimpleQualificationSortPipe} from "../../pipe/simple-qualification-sort.pipe";

@Component({
  selector: 'app-edit-employee-qualification',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, QualificationSortPipe, SimpleQualificationSortPipe],
  templateUrl: './edit-employee-qualification.component.html',
  styleUrl: './edit-employee-qualification.component.css'
})
export class EditEmployeeQualificationComponent {

  id:string='';
  qualificationList: Observable<QualificationDto[]>;
  employeeQualification:EmployeeSkillSetDto|undefined;

  constructor(private employeeService:EmployeeService,
              private qualificationService:QualificationService,
              private viewService:ViewService,
              private route:ActivatedRoute,
              private location:Location,
              private dialog:MatDialog,
  ) {
    this.qualificationList=this.qualificationService.getAllQualificationDto();
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log('EmployeeId: ' + this.id)
    });
    //Because http observables have finite values, rxjs handles the unsubscribing
    this.employeeService.getQualificationForEmployee(this.id).subscribe(data=>{
      this.employeeQualification=data;
    })
    this.viewService.swapView(View.OTHER);
  }

  //refresh list
  removeQualification(qualification: string){
    console.log("Removing qualification")
    let oldSkillSetList = this.employeeQualification
    this.employeeService.deleteQualificationForEmployee(this.id, qualification).subscribe(
      data=>this.employeeQualification=data,
      error => {
        console.log(error);
        this.employeeQualification=oldSkillSetList;

      }
    )

  }

  addQualification(qualification: QualificationDto){
    console.log("Adding qualification")
    let oldSkillSetList=this.employeeQualification;
    this.employeeService.postQualificationForEmployee(this.id, qualification).subscribe(
      data=> this.employeeQualification=data,
                  error => {
        console.log(error);
        this.employeeQualification=oldSkillSetList;
    })
  }

  goBack(){
    this.location.back();
  }

  createQualification(){
    const dialogRef = this.dialog.open(AddQualificationComponent,{
      disableClose:true,
      autoFocus:true,
      height:'40dvh',
      width:'30dvw'
    })

    dialogRef.afterClosed().subscribe(result => {
      const object = JSON.parse(result)
      if(object&&object.method == 'accept'){
        this.qualificationService.postQualification(object.data).subscribe(()=>{
          this.qualificationList = this.qualificationService.getAllQualifications();
        })
      }
    })
  }

  employeeHasQualification(qualification:QualificationDto):boolean{
    return !!this.employeeQualification!.skillSet.find(data => {
      return qualification.skill === data.skill;
    });

  }
}
