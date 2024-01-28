import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EmployeeDetailComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private keycloak:KeycloakService) {
  }

  getToken(){
    console.log(this.keycloak.isTokenExpired(3600))
    console.log(this.keycloak.getToken())
    this.keycloak.updateToken(3600).then(()=>console.log(this.keycloak.getToken()));
  }
}
