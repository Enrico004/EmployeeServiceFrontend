import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {EmployeeService} from "../../service/employee.service";
import {EmployeeWithSkill, EmployeeWithSkillDto} from "../../model/employeeWithSkill";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QualificationDto} from "../../model/qualificationDto";
import {QualificationService} from "../../service/qualification.service";
import {RouterLink} from "@angular/router";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {MatDialog} from "@angular/material/dialog";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {EmployeeWithSkillID} from "../../model/EmployeeWithSkillID";
import {ConfirmDialogComponent} from "../../modal/confirm-dialog/confirm-dialog.component";
import {DetailsService} from "../../service/details.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {EmployeeTableFilterPipe} from "../../pipe/employee-table-filter.pipe";
import {ShowToastComponent} from "../show-toast/show-toast.component";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink, EmployeeDetailComponent, NavigationBarComponent, EmployeeDetailComponent, MatFormField, MatInput, ReactiveFormsModule, EmployeeTableFilterPipe, ShowToastComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
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
export class EmployeeListComponent {
  employees$: Observable<EmployeeWithSkillDto[]>;
  qualifications$: Observable<QualificationDto[]>;
  detailsEmployee:EmployeeWithSkillDto|undefined
  filterForm:string='';


  constructor(
    private employeeService: EmployeeService,
    private qualificationService: QualificationService,
    private toastService: ToastService,
    private dialog: MatDialog,
    protected detailsService:DetailsService,
    private viewService:ViewService) {
      this.qualifications$ = of([])
      this.employees$ = this.employeeService.getAllEmployees();
      this.qualifications$ = this.getQualificationList();
      this.viewService.swapView(View.EMPLOYEE);
  }

  addEmployee() {
    let employee: EmployeeWithSkillID = new EmployeeWithSkillID()

      const dialogRef = this.dialog.open(AddEmployeeComponent, {
        disableClose:true,
        autoFocus:true,
        height:'80dvh',
        width:'40dvw',
        data:{
          ...employee
        }
      });

      dialogRef.afterClosed().subscribe(
        result => {
          const obj=JSON.parse(result);
          if(obj.method=='accept'){
            console.log("Dialog output:", obj.data)
            this.employeeService.postEmployee(obj.data).subscribe(s => {
              this.employees$ = this.employeeService.getAllEmployees();
                this.toastService.showSuccessToast("Mitarbeiter gespeichert")
            }
            );
          }
        }
      );
    }

  openDetailView(id: number){
    this.employeeService.getEmployeeById(id.toString()).subscribe(data=>{
      this.detailsEmployee = data;
      console.log(this.detailsEmployee)
      this.detailsService.openDetails();
    })
  }



  postEmployee(employee: EmployeeWithSkill): void {
    this.employeeService.postEmployee(employee).subscribe(data => console.log(JSON.stringify(data)));
    console.log(employee);
  }

  getQualification(id: number): Observable<QualificationDto> {
    return this.qualificationService.getQualificationById(id);
  }

  getQualificationList(): Observable<QualificationDto[]> {
    return this.qualificationService.getAllQualifications();
  }

  getEmployee(id: string) : Observable<EmployeeWithSkill>{
    return this.employeeService.getEmployeeById(id);
  }

  getEmployeeList(): Observable<EmployeeWithSkill[]>{
    return this.employeeService.getAllEmployees();
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
        this.employeeService.deleteEmployee(id).subscribe( s=> {
          this.employees$ = this.employeeService.getAllEmployees();
          this.toastService.showInfoToast("Löschen abgeschlossen")
        }
        );
      }
    })
  }
  closeDetailView(){
    this.detailsService.closeDetails();
  }

  filterList(){
    console.log(this.filterForm)
  }
}
