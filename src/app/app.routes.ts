import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {Input} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {QualificationListComponent} from "./qualification-list/qualification-list.component";

export const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent},
  { path: 'employee/addEmployee', component: AddEmployeeComponent},
  { path: '', component: HomeComponent},
  { path: 'employee/:id', component: EmployeeDetailComponent},
  { path: 'qualification', component: QualificationListComponent }

  //{ path: 'qualification', component: QualificationListComponent}
];
