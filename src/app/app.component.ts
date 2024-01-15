import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeService} from "./service/employee.service";
import {Observable} from "rxjs";
import {BearerToken} from "./model/bearerTest";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
  bearer: string = '';
  tokenUrl = 'https://authproxy.szut.dev';

  constructor(private http: HttpClient) {
    this.getBearerToken();

  }

  getBearer(): string {
    return this.bearer;
  }

  getBearerToken(): Observable<BearerToken> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let temp = this.http.post<BearerToken>(this.tokenUrl,
      'grant_type=password&client_id=employee-management-service&username=user&password=test',
      {headers});
    temp.subscribe(s => this.bearer = s.access_token || '');
    return temp;
  }
}
