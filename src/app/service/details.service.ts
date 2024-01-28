import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  public showDetails=new BehaviorSubject(false);

  constructor() { }

  public closeDetails(){
    this.showDetails.next(false);
  }
  public openDetails(){
    this.showDetails.next(true);
  }
}
