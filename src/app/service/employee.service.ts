import { Injectable } from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {EmployeeWithSkill, EmployeeWithSkillDto} from "../model/employeeWithSkill";
import {Employee} from "../Employee";
import {EmployeeWithSkillID, EmployeeWithSkillIdDto} from "../model/EmployeeWithSkillID";
import {HttpClient} from "@angular/common/http";
import {QualificationDto} from "../model/qualificationDto";
import {EmployeeSkillSetDto} from "../model/employeSkillSetDto";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "http://localhost:8089";

  constructor(private httpClient:HttpClient,
              private toastService: ToastService) { }

  //GET ENDPOINTS
  getEmployeeById(id: string): Observable<EmployeeWithSkillDto>{
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.get<EmployeeWithSkillDto>(apiUrl)
  }

  getAllEmployees(): Observable<EmployeeWithSkillDto[]>{
    this.toastService.showSuccessToast("Test", "Eine Nachricht")
    const apiUrl: string = `${this.baseUrl}/employees`;
    return this.httpClient.get<EmployeeWithSkillDto[]>(apiUrl)
  }

  getQualificationForEmployee(id: string):Observable<EmployeeSkillSetDto>{
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.get<EmployeeSkillSetDto>(apiUrl)
  }


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


  postQualificationForEmployee(id: string, quali: QualificationDto):Observable<any> {
    console.log(`Deleting qualification ${quali.skill} for employee ${id}`)
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.post(apiUrl, {skill:quali.skill});
  }

  deleteEmployee(id: number) {
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.delete(apiUrl)
  }

  deleteQualificationForEmployee(id: string,qualification:string):Observable<EmployeeSkillSetDto> {
    console.log(`Deleting qualification ${qualification} for employee ${id}`)

    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.delete<EmployeeSkillSetDto>(apiUrl,{body:{
      skill:qualification
      }})
  }

  editEmployee(employeeToEdit:EmployeeWithSkillDto):Observable<EmployeeWithSkillDto>{
    let qualificationList:number[]=[];
    for(let qualification of employeeToEdit.skillSet){
      qualificationList.push(qualification.id)
    }
    let employee:EmployeeWithSkillIdDto={
      firstName:employeeToEdit.firstName,
      lastName:employeeToEdit.lastName,
      street:employeeToEdit.street,
      city:employeeToEdit.city,
      postcode:employeeToEdit.postcode,
      phone:employeeToEdit.phone,
      skillSet:qualificationList
    }
    console.log("Editing employee with id "+employeeToEdit.id);
    return this.httpClient.put<EmployeeWithSkillDto>(`${this.baseUrl}/employees/${employeeToEdit.id}`,employee)
  }
}
