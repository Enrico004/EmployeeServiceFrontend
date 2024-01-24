import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {Input} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {QualificationListComponent} from "./qualification-list/qualification-list.component";
import {AuthGuard} from "./service/AuthGuard";

export const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent,canActivate:[AuthGuard]},
  { path: 'employee/addEmployee', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  { path: '', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'employee/:id', component: EmployeeDetailComponent, canActivate:[AuthGuard]},
  { path: 'qualification', component: QualificationListComponent, canActivate:[AuthGuard] }

  //{ path: 'qualification', component: QualificationListComponent}
];
