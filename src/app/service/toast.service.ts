import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ToastEvent} from "../model/toastEvent";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showSuccessToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: "success",
    });
  }
}
