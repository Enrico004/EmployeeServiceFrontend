import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QualificationService} from "../../service/qualification.service";
import {ActivatedRoute} from "@angular/router";
import {EmployeesForQualificationDto} from "../../model/employeesForQualificationDto";
import {BehaviorSubject, from, Observable} from "rxjs";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {ConfirmDialogComponent} from "../../modal/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../service/employee.service";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {EmployeeWithSkillDto} from "../../model/employeeWithSkill";
import {DetailsService} from "../../service/details.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-qualification-details',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, EmployeeDetailComponent],
  templateUrl: './qualification-details.component.html',
  styleUrl: './qualification-details.component.css',
  animations:[
    trigger('openClose', [
      transition(':enter',[
        style({width:'55dvh',opacity:0.5}),animate('500ms ease-in',style({width:'65dvw',opacity:1}))
      ])
      ,
      transition(':leave',[
        style({width:'65dvw',opacity:1}),animate('500ms ease-out',style({width:'55dvh',opacity:0.5}))
      ])
    ])]
})
export class QualificationDetailsComponent {
  id:string=''
  employeeList:Observable<EmployeesForQualificationDto>;
  detailsEmployee:EmployeeWithSkillDto|undefined;
  constructor(private qualificationService:QualificationService,private route:ActivatedRoute,
              private dialog:MatDialog,private employeeService:EmployeeService,
              protected detailsService:DetailsService) {
    this.route.params.subscribe(params=>this.id=params['id']);
    this.employeeList=this.qualificationService.getEmployeesForQualification(this.id);
  }
  ngOnInit(){

  }
  deleteEmployee(id: number, name: string){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      disableClose:true,
      autoFocus: true,
      data: {
        name:name
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      const obj=JSON.parse(result);
      if(obj&&obj.method=='confirm'){
        console.log('Deleting item')
        this.employeeService.deleteEmployee(id).subscribe( s=>
          this.employeeList = this.qualificationService.getEmployeesForQualification(this.id)
        );
      }
    })
  }
  openDetailView(id:number){
    this.employeeService.getEmployeeById(id.toString()).subscribe(data=>{
      this.detailsEmployee=data;
      console.log(this.detailsEmployee)
      this.detailsService.openDetails()
    })
  }

  closeDetailView(){
    this.detailsService.closeDetails()
  }
}
