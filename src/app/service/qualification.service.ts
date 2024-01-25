import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {QualificationDto} from "../model/qualificationDto";
import {EmployeesForQualificationDto} from "../model/employeesForQualificationDto";


@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private baseUrl: string = "http://localhost:8089";

  constructor(private httpClient: HttpClient) {
  }

  getAllQualifications(): Observable<QualificationDto[]> {
    const apiUrl: string = `${this.baseUrl}/qualifications`;
    return this.httpClient.get<QualificationDto[]>(apiUrl)
  }

  public getQualificationById(id: number): Observable<QualificationDto> {
    const apiUrl: string = `${this.baseUrl}/qualifications/${id}`;
    return this.httpClient.get<QualificationDto>(apiUrl)
  }

  public getAllQualificationDto():Observable<QualificationDto[]>{
    return this.httpClient.get<QualificationDto[]>(this.baseUrl+'/qualifications')

  }

  updateQualification(id: number, skill: string): Observable<QualificationDto> {
    const apiUrl: string = `${this.baseUrl}/qualifications/${id}`;
    const requestBody = { skill: skill };

    return this.httpClient.put<QualificationDto>(apiUrl, requestBody, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  public postQualification(quali: string): Observable<any> {
    return this.httpClient.post(this.baseUrl+'/qualifications', quali)
  }





}
