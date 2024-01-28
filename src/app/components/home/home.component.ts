import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EmployeeDetailComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private keycloak:KeycloakService,private router:Router,
              private viewService:ViewService) {
  }

  getToken(){
    console.log(this.keycloak.isTokenExpired(3600))
    console.log(this.keycloak.getToken())
    this.keycloak.updateToken(3600).then(()=>console.log(this.keycloak.getToken()));
  }
  navigateToEmployee(){
    this.viewService.swapView(View.EMPLOYEE);
    this.router.navigateByUrl('/employee');
  }

  navigateToQualification(){
    this.viewService.swapView(View.QUALIFICATION);
    this.router.navigateByUrl('/qualification')
  }

}
