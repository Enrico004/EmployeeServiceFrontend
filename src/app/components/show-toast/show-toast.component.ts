import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastService} from "../../service/toast.service";
import {ToastEvent} from "../../model/toastEvent";

@Component({
  selector: 'app-show-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-toast.component.html',
  styleUrl: './show-toast.component.css'
})
export class ShowToastComponent implements OnInit{
  currentToasts: ToastEvent[] = [];

  constructor(private toastService: ToastService,
              private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      setTimeout(() => {
        this.dispose(0);
      }, 2500)
      this.cdr.detectChanges();
    });
  }

  dispose(index: number){
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }

}
