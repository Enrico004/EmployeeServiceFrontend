import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {EmployeeWithSkillDto, instanceOfEmployeeWithSkillDto} from "../model/employeeWithSkill";
import {EmployeeWithSkillIdDto} from "../model/EmployeeWithSkillID";
import {HttpClient} from "@angular/common/http";
import {QualificationDto} from "../model/qualificationDto";
import {EmployeeSkillSetDto} from "../model/employeSkillSetDto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "http://localhost:8089";

  constructor(private httpClient:HttpClient) { }

  //GET ENDPOINTS
  getEmployeeById(id: string): Observable<EmployeeWithSkillDto>{
    const apiUrl: string = `${this.baseUrl}/employees/${id}`;
    return this.httpClient.get<EmployeeWithSkillDto>(apiUrl)
  }

  getAllEmployees(): Observable<EmployeeWithSkillDto[]>{
    //this.toastService.showSuccessToast("Erfolg", "Employee Liste geladen")
    const apiUrl: string = `${this.baseUrl}/employees`;
    return this.httpClient.get<EmployeeWithSkillDto[]>(apiUrl)
  }

  getQualificationForEmployee(id: string):Observable<EmployeeSkillSetDto>{
    const apiUrl: string = `${this.baseUrl}/employees/${id}/qualifications`;
    return this.httpClient.get<EmployeeSkillSetDto>(apiUrl)
  }


  createEmployee(employee: EmployeeWithSkillIdDto | EmployeeWithSkillDto): Observable<any> {
    if (instanceOfEmployeeWithSkillDto(employee)){
      employee = this.getEmployeeWithSkillId(employee);
    }
    const apiUrl: string = `${this.baseUrl}/employees`;
   return this.httpClient.post(apiUrl, employee)
  }




  getEmployeeWithSkillId(employee: EmployeeWithSkillDto): EmployeeWithSkillIdDto {
    console.log(employee.skillSet);
    let newSkillSet: number[]=[]
    if (employee.skillSet) {
      newSkillSet= employee.skillSet?.map((item) => item.id)
    }     
    return {
      lastName: employee.lastName,
      firstName: employee.firstName,
      street: employee.street,
      city: employee.city,
      postcode: employee.postcode,
      phone: employee.phone,
      skillSet: newSkillSet
    };
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
    console.log(employeeToEdit)
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
