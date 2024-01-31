import {Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {QualificationService} from "../../service/qualification.service";
import {ActivatedRoute} from "@angular/router";
import {EmployeesForQualificationDto} from "../../model/employeesForQualificationDto";
import {Observable} from "rxjs";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {ConfirmDialogComponent} from "../../modal/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../service/employee.service";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {EmployeeWithSkillDto} from "../../model/employeeWithSkill";
import {DetailsService} from "../../service/details.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";
import {EmployeeSortPipe} from "../../pipe/employee-sort.pipe";
import {ShortEmployeeSortPipe} from "../../pipe/short-employee-sort.pipe";

@Component({
  selector: 'app-qualification-details',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, EmployeeDetailComponent, EmployeeSortPipe, ShortEmployeeSortPipe],
  templateUrl: './qualification-details.component.html',
  styleUrl: './qualification-details.component.css',
  animations:[
    trigger('openClose', [
      transition(':enter',[
        style({opacity:0}),animate('500ms ease-in',style({opacity:1}))
      ])
      ,
      transition(':leave',[
        style({opacity:1}),animate('500ms ease-out',style({opacity:0}))
      ])
    ])]
})
export class QualificationDetailsComponent {
  id:string=''
  employeeList: Observable<EmployeesForQualificationDto>;
  detailsEmployee: EmployeeWithSkillDto | undefined;
  constructor(private qualificationService: QualificationService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private employeeService: EmployeeService,
              protected detailsService: DetailsService,
              private viewService: ViewService,
              private location:Location
  ) {
    this.route.params.subscribe(params=> this.id = params['id']);
    this.employeeList = this.qualificationService.getEmployeesForQualification(this.id);
    this.viewService.swapView(View.OTHER)
  }

  deleteEmployee(id: number, name: string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose: true,
      autoFocus: true,
      data: {
        name: name
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(result);
      if(obj&&obj.method == 'confirm'){
        console.log('Deleting item')
        this.employeeService.deleteEmployee(id).subscribe( s=>
          this.employeeList = this.qualificationService.getEmployeesForQualification(this.id)
        );
      }
    })
  }
  openDetailView(id:number){
    this.employeeService.getEmployeeById(id.toString()).subscribe(data=> {
      this.detailsEmployee = data;
      console.log(this.detailsEmployee)
      this.detailsService.openDetails()
    })
  }

  closeDetailView(){
    this.detailsService.closeDetails()
  }
  goBack(){
    this.location.back();
  }
}
