import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Qualification} from "../model/qualification";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private baseUrl: string = "https://employee.szut.dev";
  //token: string;

  constructor(private httpClient: HttpClient) {
    //this.token = this.tokenService.getToken();
  }

  getAllQualifications(): Observable<Qualification[]> {
    const apiUrl: string = `${this.baseUrl}/qualifications`;
    return this.httpClient.get<Qualification[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        /*.set('Authorization', `Bearer ${this.tokenService.getToken()}`)*/
    })
  }

  public getQualificationById(id: number): Observable<Qualification> {
    const apiUrl: string = `${this.baseUrl}/qualifications/${id}`;
    return this.httpClient.get<Qualification>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        /*.set('Authorization', `Bearer ${this.tokenService.getToken()}`)*/
    })
  }


}
