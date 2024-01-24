import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KeycloakService} from "keycloak-angular";

export class KeyCloakHttpInterceptor implements HttpInterceptor {


    constructor(private keyCloakService:KeycloakService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token=this.keyCloakService.getToken();
      console.log('Setting auth header')
      if(token){
        req.clone({
          setHeaders:{
            'Authorization' :`Bearer ${token}`
          }
        })
      }
      return next.handle(req)
    }

}
