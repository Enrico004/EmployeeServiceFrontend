import { APP_INITIALIZER,ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakAngularModule,KeycloakService } from 'keycloak-angular';


import { routes } from './app.routes';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import {KeyCloakHttpInterceptor} from "./service/http-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }, provideHttpClient(withInterceptorsFromDi()), provideAnimations()]
};

function initializeKeycloak(keycloak:KeycloakService){
  return () =>
    keycloak.init({
      config:{
        url:"https://keycloak.szut.dev/auth",
        realm:"szut",
        clientId:"employee-management-service-frontend",
      },
      enableBearerInterceptor:true,
      initOptions:{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    })
}
