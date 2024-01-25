import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Qualification} from "../model/qualification";
import {QualificationDto} from "../model/qualificationDto";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private baseUrl: string = "http://localhost:8089";

  constructor(private httpClient: HttpClient) {
  }

  getAllQualifications(): Observable<Qualification[]> {
    const apiUrl: string = `${this.baseUrl}/qualifications`;
    return this.httpClient.get<Qualification[]>(apiUrl)
  }

  public getQualificationById(id: number): Observable<Qualification> {
    const apiUrl: string = `${this.baseUrl}/qualifications/${id}`;
    return this.httpClient.get<Qualification>(apiUrl)
  }

  public getAllQualificationDto():Observable<QualificationDto[]>{
    return this.httpClient.get<QualificationDto[]>(this.baseUrl+'/qualifications')

  }


}
