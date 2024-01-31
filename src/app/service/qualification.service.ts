import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {QualificationDto} from "../model/qualificationDto";
import {EmployeesForQualificationDto} from "../model/employeesForQualificationDto";
import {ToastService} from "./toast.service";


@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private baseUrl: string = "http://localhost:8089";

  constructor(private httpClient: HttpClient, private toastService:ToastService) {
  }

  getAllQualifications(): Observable<QualificationDto[]> {
    const apiUrl: string = `${this.baseUrl}/qualifications`;
    return this.httpClient.get<QualificationDto[]>(apiUrl)
  }

  public getAllQualificationDto():Observable<QualificationDto[]>{
    return this.httpClient.get<QualificationDto[]>(this.baseUrl+'/qualifications')

  }

  updateQualification(qualification:QualificationDto): Observable<QualificationDto> {
    const apiUrl: string = `${this.baseUrl}/qualifications/${qualification.id}`;
    const requestBody = { skill: qualification.skill };

    return this.httpClient.put<QualificationDto>(apiUrl, requestBody, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  public postQualification(quali: string): Observable<any> {
    return this.httpClient.post(this.baseUrl+'/qualifications', quali)
  }

  public deleteQualification(id: number){
    return this.httpClient.delete(this.baseUrl+`/qualifications/${id}`).pipe(
      catchError(err => {
        this.toastService.showErrorToast("Qualifikation kann nicht gelöscht werden");
        console.log(err);
        throw err
      })
    )
  }

  public getEmployeesForQualification(id:string): Observable<EmployeesForQualificationDto>{
    return this.httpClient.get<EmployeesForQualificationDto>(`${this.baseUrl}/qualifications/${id}/employees`);
  }




}
