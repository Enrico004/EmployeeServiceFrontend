import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {Employee} from "../Employee";
import {Qualification} from "../model/qualification";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "https://employee.szut.dev";

  constructor(private httpClient: HttpClient) { }

  getEmployeeById(token: string, id: number): Observable<EmployeeWithSkill>{
    const apiUrl = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.get<EmployeeWithSkill>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).pipe(result => {
      return result;
    });
  }

  getAllEmployees(token: string): Observable<EmployeeWithSkill[]>{
    const apiUrl = `${this.baseUrl}/employees`;
    //let employees: EmployeeWithSkill = new EmployeeWithSkill(1);
    return this.httpClient.get<EmployeeWithSkill[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).pipe(result => {
      return result;
    });
    //.pipe(
      //catchError(this.handleError),
    //)
  }

  getAllQualifications(token: string): Observable<Qualification[]> {
    const apiUrl = `${this.baseUrl}/qualifications`;
    return this.httpClient.get<Qualification[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    })
  }
}
