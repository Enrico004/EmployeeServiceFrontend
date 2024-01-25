import { Injectable } from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {Employee} from "../Employee";
import {Qualification} from "../model/qualification";
import {EmployeeWithSkillID} from "../model/EmployeeWithSkillID";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "http://localhost:8089";

  constructor(private httpClient:HttpClient) { }

  //GET ENDPOINTS
  getEmployeeById(id: string): Observable<EmployeeWithSkill>{
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.get<EmployeeWithSkill>(apiUrl)
  }

  getAllEmployees(): Observable<EmployeeWithSkill[]>{
    const apiUrl: string = `${this.baseUrl}/employees`;
    return this.httpClient.get<EmployeeWithSkill[]>(apiUrl)
  }

  getQualificationForEmployee(id: number){
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.get<Qualification[]>(apiUrl)
  }


  //TODO: POST ENDPOINTS
// Dieser Fehler sollte gefixt sein //Aktuell gibt es eine Type Inkompatabilität zwischen EmployeeWithSkill und dem Backend, wo nur die ID der skills erwartet wird...
  postEmployee(employee: EmployeeWithSkillID | EmployeeWithSkill): Observable<any> {
    if (employee instanceof EmployeeWithSkill){
      employee = this.getEmployeeWithSkillId(employee);
    }
    const apiUrl: string = `${this.baseUrl}/employees`;
   return this.httpClient.post(apiUrl, employee)
  }




  getEmployeeWithSkillId(employee: EmployeeWithSkill): EmployeeWithSkillID {
    let skillId: EmployeeWithSkillID = new EmployeeWithSkillID(employee.lastName, employee.firstName, employee.street, employee.city, employee.postcode, employee.phone, employee.skillSet?.map((item) => item.id));
    return skillId;
  }


  postQualificationForEmployee(id: number, quali: Qualification) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.post(apiUrl, quali);
  }

  deleteEmployee(id: number) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.delete(apiUrl)
  }

  deleteQualificationForEmployee(id: number) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.delete(apiUrl)
  }
}
