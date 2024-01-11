import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {EmployeeWithSkill} from "../model/employeeWithSkill";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "https://employee.szut.dev";

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(token: string): Observable<EmployeeWithSkill[]>{
    const apiUrl = `${this.baseUrl}/employees`;
    //let employees: EmployeeWithSkill = new EmployeeWithSkill(1);
    return this.httpClient.get<EmployeeWithSkill[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).pipe(result => {
      return result;
    })
    //.pipe(
      //catchError(this.handleError),
    //)
  }
}
