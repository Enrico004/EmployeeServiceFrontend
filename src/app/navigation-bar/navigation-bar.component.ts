import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  constructor(private keycloakService:KeycloakService) {
  }
  async logout(){
    console.log("Deleting cookies")
    await this.keycloakService.logout("http://localhost:4200/");
  }
}
