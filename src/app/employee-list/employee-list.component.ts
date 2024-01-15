import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable, of, ReplaySubject} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {Employee} from "../Employee";
import {EmployeeService} from "../service/employee.service";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {BearerToken} from "../model/bearerTest";
import {FormsModule} from "@angular/forms";
import {Qualification} from "../model/qualification";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  @Input() bearer: string = '';
  //bearer = ''//'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDUwNjIxMDEsImlhdCI6MTcwNTA1ODUwMSwianRpIjoiODAyZThkMzAtYjBkOS00Y2ZhLTkyOTQtZDM1NTVjMGViZmY0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIxMmZjZWRkYi0yODUyLTRkNWQtYTUxYy0xN2FkNjVmNjk0NzgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInByb2R1Y3Rfb3duZXIiLCJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc3p1dCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyIn0.Bdyu1Z2awJcsuds1dGkJD6zcb7X7SAzmD2cAtIJ0qky86EqXKvxVQKE_o_QiXP4353jXFgXvlItoyLeD2faWAPupH51wvBEgJrHwK9KrR8m4TWBEbronsuVy2Q6e1FsPwhflFQNfWWnZoow9ZXuX71A2S81o5HiinMhxFyPH4AnYkqegkBU0bcBXu3inCDMYCTOJO8-9UsyW2mgnj1gTiAupAFn7yn-zttuCubuZMtb8HkN5piBQCZQFoeM32VrG0ntCL0g9oyqIJ4JG1jJ2V_lrTDFhD3v06TIt3kUFc7wx3--Xv9NzBxkUxrT60mY1yj2NZH5hPibKWlKeiBj4ng';
  employees$: Observable<Employee[]>;
  tokenUrl = 'https://authproxy.szut.dev';
  testEmployee: Observable<EmployeeWithSkill>;
  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient, private employeeService: EmployeeService) {
    this.employees$ = of([]);
    this.qualifications$ = of([])
    this.testEmployee = of();
    setTimeout(() => {
      this.employees$ = this.getEmployeeList(this.bearer);
      this.testEmployee = this.getEmployee(this.bearer, 36);
      this.qualifications$ = this.getQualifications(this.bearer)
    },1000)
  }

  printTokens(): void {
    console.log(this.bearer);
  }

  getQualifications(token: string): Observable<Qualification[]> {
    return this.employeeService.getAllQualifications(token);
  }

  getEmployee(token: string, id: number) : Observable<EmployeeWithSkill>{
    return this.employeeService.getEmployeeById(token, id);
  }

  getEmployeeList(token: string): Observable<EmployeeWithSkill[]>{
    return this.employeeService.getAllEmployees(token);
  }
  // Gibt dasselbe zurück wie getBearerToken.http, aber ich weiß nicht weiter :/
  getBearerToken(): Observable<BearerToken> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let temp = this.http.post<BearerToken>(this.tokenUrl,
        'grant_type=password&client_id=employee-management-service&username=user&password=test',
        {headers});
    temp.subscribe(s => this.bearer = s.access_token || '');
    return temp;
    /**
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let temp = this.http.post<string>(this.tokenUrl,
      'grant_type=password&client_id=employee-management-service&username=user&password=test',
        {headers});
    temp.subscribe(s => console.log(s));
    **/
    //Funktioniert, gibt aber alles als ein String aus...
    /**
    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.tokenUrl);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader('Content-Length', '85');
    //xhr.setRequestHeader('Connection', 'Keep-Alive');
    //xhr.setRequestHeader('User-Agent', 'Apache-HttpClient/4.5.14 (Java/17.0.8.1)');
    //xhr.setRequestHeader('Accept-Encoding', 'br,deflate,gzip,x-gzip');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);

      }
    };
    let data = 'grant_type=password&client_id=employee-management-service&username=user&password=test';
    xhr.send(data);
        **/
  }
}
