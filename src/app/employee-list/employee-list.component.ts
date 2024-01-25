import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {EmployeeService} from "../service/employee.service";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {FormsModule} from "@angular/forms";
import {Qualification} from "../model/qualification";
import {QualificationService} from "../service/qualification.service";
import {Router, RouterLink} from "@angular/router";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {EmployeeWithSkillID} from "../model/EmployeeWithSkillID";
import {ConfirmDialogComponent} from "../modal/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink, EmployeeDetailComponent, NavigationBarComponent, EmployeeDetailComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<EmployeeWithSkill[]>;
  testEmployee: Observable<EmployeeWithSkill>;
  qualifications$: Observable<Qualification[]>;


  constructor(
    private employeeService: EmployeeService,
    private qualiService: QualificationService,
    private router: Router,
    private dialog: MatDialog,) {
      this.qualifications$ = of([])
      this.testEmployee = of();
      this.employees$ = this.employeeService.getAllEmployees();
      this.qualifications$ = this.getQualificationList();
  }

  addEmployee() {
    const dialogConfig = new MatDialogConfig();
    let employee: EmployeeWithSkillID = new EmployeeWithSkillID()

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        ...employee
      };
      const dialogRef = this.dialog.open(AddEmployeeComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        result => {
          const obj=JSON.parse(result);
          if(obj.method=='accept'){
            console.log("Dialog output:", obj.data)
            this.employeeService.postEmployee(obj.data).subscribe(s =>
              this.employees$ = this.employeeService.getAllEmployees()
            );
          }
        }
      );
    }

  goToDetailView(id: number){
    this.router.navigate(['/employee', id]);
  }



  postEmployee(employee: EmployeeWithSkill): void {
    this.employeeService.postEmployee(employee).subscribe(data => console.log(JSON.stringify(data)));
    console.log(employee);
  }

  getQualification(id: number): Observable<Qualification> {
    return this.qualiService.getQualificationById(id);
  }

  getQualificationList(): Observable<Qualification[]> {
    return this.qualiService.getAllQualifications();
  }

  getEmployee(id: string) : Observable<EmployeeWithSkill>{
    return this.employeeService.getEmployeeById(id);
  }

  getEmployeeList(): Observable<EmployeeWithSkill[]>{
    return this.employeeService.getAllEmployees();
  }

  openDeleteDialog(id: number, name: string){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
        //width:'50dvw',
        //height:'50dvh',
        disableClose:true,
        data: {
          name:name
        }
      })
    dialogRef.afterClosed().subscribe(result=>{
      const obj=JSON.parse(result);
      if(obj&&obj.method=='confirm'){
        console.log('Deleting item')
        this.employeeService.deleteEmployee(id).subscribe( s=>
          this.employees$ = this.employeeService.getAllEmployees()
        );
      }
    })
  }
}
