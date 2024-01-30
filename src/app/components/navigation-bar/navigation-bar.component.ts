import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";
import {ShowToastComponent} from "../show-toast/show-toast.component";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, ShowToastComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  constructor(private keycloakService: KeycloakService, protected viewService:ViewService,
              private router:Router) {
  }
  async logout(){
    console.log("Deleting cookies")
    await this.keycloakService.logout("http://localhost:4200/");
  }
  navigateToEmployee(){
    this.viewService.swapView(View.EMPLOYEE)
    this.router.navigateByUrl('/employee')
  }

  navigateToQualification(){
    this.viewService.swapView(View.QUALIFICATION);
    this.router.navigateByUrl('/qualification');
  }

  navigateToHome(){
    this.viewService.swapView(View.START);
    this.router.navigateByUrl('');
  }

  protected readonly View = View;
}
