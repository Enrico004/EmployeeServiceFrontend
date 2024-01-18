import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {Employee} from "../Employee";
import {Qualification} from "../model/qualification";
import {EmployeeWithSkillID} from "../model/EmployeeWithSkillID";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "https://employee.szut.dev";

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  //GET ENDPOINTS
  getEmployeeById(id: number): Observable<EmployeeWithSkill>{
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.get<EmployeeWithSkill>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    }).pipe(result => {
      return result;
    });
  }

  getAllEmployees(): Observable<EmployeeWithSkill[]>{
    const apiUrl: string = `${this.baseUrl}/employees`;
    //let employees: EmployeeWithSkill = new EmployeeWithSkill(1);
    return this.httpClient.get<EmployeeWithSkill[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    }).pipe(result => {
      return result;
    });
    //.pipe(
      //catchError(this.handleError),
    //)
  }

  getQualificationForEmployee(id: number){
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.get<Qualification[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    })
  }


  //TODO: POST ENDPOINTS
// Dieser Fehler sollte gefixt sein //Aktuell gibt es eine Type Inkompatabilität zwischen EmployeeWithSkill und dem Backend, wo nur die ID der skills erwartet wird...
  postEmployee(employee: EmployeeWithSkillID | EmployeeWithSkill): Observable<any> {
    if (employee instanceof EmployeeWithSkill){
      employee = this.getEmployeeWithSkillId(employee);
    }
    const apiUrl: string = `${this.baseUrl}/employees`;
    let apiCall = this.httpClient.post(apiUrl, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    });
    apiCall.subscribe(res => {

    })
    return apiCall;
  }




  getEmployeeWithSkillId(employee: EmployeeWithSkill): EmployeeWithSkillID {
    let skillId: EmployeeWithSkillID = new EmployeeWithSkillID(employee.lastName, employee.firstName, employee.street, employee.city, employee.postcode, employee.phone, employee.skillSet?.map((item) => item.id));
    return skillId;
  }


  postQualificationForEmployee(id: number, quali: Qualification) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.post(apiUrl, quali, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    });
  }


  //TODO DELETE ENDPOINTS

  deleteEmployee(id: number) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.delete(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    })
  }

  deleteQualificationForEmployee(id: number) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.delete(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
    })
  }
}
