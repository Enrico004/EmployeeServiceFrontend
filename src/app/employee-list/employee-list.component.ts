import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, map, Observable, of, ReplaySubject} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {Employee} from "../Employee";
import {EmployeeService} from "../service/employee.service";
import {EmployeeWithSkill} from "../model/employeeWithSkill";
import {BearerToken} from "../model/bearerTest";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDQ5OTI4ODMsImlhdCI6MTcwNDk4OTI4MywianRpIjoiMDQ0YzRmYTktODI5My00M2U0LTkyNjMtNGEzZGUwMDE1YzdhIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJlMmIyMzA4Ni01ZjM1LTQ3MzItYThjNS02NGMwOTdiMTU0ZmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInByb2R1Y3Rfb3duZXIiLCJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc3p1dCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyIn0.X-vpfOMfdPuoyIucoIwKD40uRx3I_VPtZV21AXLvdXEk3xwH4x3gg3bWvs7RTZiLTMkz8n9LjIRbzC13x-cxZMEljv0eWLq-NUe5DxWAjjBmn-VnbM1CC_xM_V2YNFoioQUJYMYH1iFwn5xjgK4VJp4epudKy18KnzMABDyke__9fr274Icv85j5znivxOoyINcN5l1uuIGk2JZ-DBumfPqzKQigOeTsZv5N1uRNYciHKY3qCjUTCoOgbYtiMywWH5eEi_AdSMiQCYHQVNAQUXsL3NhexvaOuE9pmnqsdNP9NZMI1YbZHbs2mOIidm3pC_zVUOmmINdUZsNeKnmRcg';
  employees$: Observable<Employee[]>;
  tokenUrl = 'https://authproxy.szut.dev';
  obsBearer$: ReplaySubject<BearerToken>;

  constructor(private http: HttpClient, private employeeService: EmployeeService) {
    this.obsBearer$ = new ReplaySubject<BearerToken>();
    this.employees$ = of([]);
    //this.bearer = this.getBearerToken();
    this.getBearerToken().subscribe(s => {
      this.obsBearer$.next(s);
    });
    //this.fetchData();
    this.employees$ = this.getEmployeeList(this.bearer);

  }

  getEmployeeList(token: string): Observable<EmployeeWithSkill[]>{
    return this.employeeService.getAllEmployees(token);
  }
  /**
  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
    **/
  // Gibt dasselbe zurück wie getBearerToken.http, aber ich weiß nicht weiter :/
  getBearerToken(): Observable<BearerToken> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let temp = this.http.post<BearerToken>(this.tokenUrl,
        'grant_type=password&client_id=employee-management-service&username=user&password=test',
        {headers});
    temp.subscribe(s => console.log(s.access_token));
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
