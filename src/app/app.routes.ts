import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeDetailComponent} from "./components/employee-detail/employee-detail.component";
import {Input} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {QualificationListComponent} from "./components/qualification-list/qualification-list.component";
import {AuthGuard} from "./service/AuthGuard";
import {QualificationDetailsComponent} from "./components/qualification-details/qualification-details.component";
import {AddQualificationComponent} from "./components/add-qualification/add-qualification.component";
import {EditEmployeeQualificationComponent} from "./components/edit-employee-qualification/edit-employee-qualification.component";

export const routes: Routes = [

  { path: 'employee', component: EmployeeListComponent,canActivate:[AuthGuard]},
  { path: 'employee/addEmployee', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  { path: '', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'employee/:id', component: EmployeeDetailComponent, canActivate:[AuthGuard]},
  { path: 'qualification', component: QualificationListComponent, canActivate:[AuthGuard] },
  { path: 'qualification/:id/employees', component: QualificationDetailsComponent,canActivate:[AuthGuard]},
  { path: 'qualification/addQualification', component: AddQualificationComponent ,canActivate:[AuthGuard]},
  { path: 'employee/:id/qualification',component:EditEmployeeQualificationComponent,canActivate:[AuthGuard]},
  { path: '**',redirectTo:'',pathMatch:'full',canActivate:[AuthGuard]}

];
