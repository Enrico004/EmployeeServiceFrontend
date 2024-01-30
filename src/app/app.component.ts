import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ShowToastComponent} from "./components/show-toast/show-toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, HomeComponent, RouterOutlet, ShowToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';





  constructor() {
  }


}

