import { Injectable } from '@angular/core';
import {View} from "../model/view";

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  currentView:View=View.START

  constructor() { }

  swapView(view:View){
    this.currentView=view;
  }
}
