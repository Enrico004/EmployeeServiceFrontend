import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Qualification} from "../model/qualification";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private baseUrl: string = "https://employee.szut.dev";

  constructor(private httpClient: HttpClient) { }

  getAllQualifications(token: string): Observable<Qualification[]> {
    const apiUrl: string = `${this.baseUrl}/qualifications`;
    return this.httpClient.get<Qualification[]>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    })
  }

  public getQualificationById(token: string, id: number): Observable<Qualification> {
    const apiUrl: string = `${this.baseUrl}/qualifications/${id}`;
    return this.httpClient.get<Qualification>(apiUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    })
  }

}
