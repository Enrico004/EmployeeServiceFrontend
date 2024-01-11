import { APP_INITIALIZER,ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakAngularModule,KeycloakService } from 'keycloak-angular';


import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  //providers: [provideRouter(routes), importProvidersFrom(), provideHttpClient()]
  providers: [provideRouter(routes),
    KeycloakService,{
    provide:APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi:true,
    deps: [KeycloakService]
  }, provideHttpClient()]
};

function initializeKeycloak(keycloak:KeycloakService){
  return () =>
    keycloak.init({
      config:{
        url:" https://keycloak.szut.dev/auth",
        realm:"szut",
        clientId:"employee-management-service-frontend"
      },
      initOptions:{
        onLoad:"login-required",
      }
    })
}
