import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BearerToken} from "../model/bearerTest";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  bearer: string = '';
  tokenUrl = 'https://authproxy.szut.dev';
  constructor(private http: HttpClient) {
    this.getObservableToken();

  }

  getToken(): string {
    return this.bearer;
  }

  getObservableToken(): Observable<BearerToken> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let temp = this.http.post<BearerToken>(this.tokenUrl,
      'grant_type=password&client_id=employee-management-service&username=user&password=test',
      {headers});
    temp.subscribe(s => this.bearer = s.access_token || '');
    return temp;
  }
}
