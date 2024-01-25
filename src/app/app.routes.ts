import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {Input} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {QualificationListComponent} from "./qualification-list/qualification-list.component";
import {AuthGuard} from "./service/AuthGuard";
import {QualificationDetailsComponent} from "./qualification-details/qualification-details.component";
import {AddQualificationComponent} from "./add-qualification/add-qualification.component";
import {EditEmployeeQualificationComponent} from "./edit-employee-qualification/edit-employee-qualification.component";

export const routes: Routes = [

  { path: 'employee', component: EmployeeListComponent,canActivate:[AuthGuard]},
  { path: 'employee/addEmployee', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  { path: '', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'employee/:id', component: EmployeeDetailComponent, canActivate:[AuthGuard]},
  { path: 'qualification', component: QualificationListComponent, canActivate:[AuthGuard] },
  { path: 'qualification/employees', component: QualificationDetailsComponent,canActivate:[AuthGuard]},
  { path: 'qualification/addQualification', component: AddQualificationComponent ,canActivate:[AuthGuard]},
  { path: 'employee/:id/qualification',component:EditEmployeeQualificationComponent,canActivate:[AuthGuard]},
  { path: '**',redirectTo:'',pathMatch:'full',canActivate:[AuthGuard]}

];
