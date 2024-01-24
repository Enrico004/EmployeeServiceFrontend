import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {EmployeeWithSkill} from "./app/model/employeeWithSkill";
import {Observable} from "rxjs";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/**
declare global {
  interface Window {
    globalEmployeeList: Observable<EmployeeWithSkill[]>;
  }
  //var employeeList: Observable<EmployeeWithSkill[]>;

}
**/
