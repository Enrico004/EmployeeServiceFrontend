import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {Input} from "@angular/core";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent},
  { path: '', component: HomeComponent},
  { path: 'employee/:id', component: EmployeeDetailComponent},
  //{ path: 'qualification', component: QualificationListComponent}
];
