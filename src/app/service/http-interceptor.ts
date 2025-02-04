import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, lastValueFrom,Observable,} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class KeyCloakHttpInterceptor implements HttpInterceptor {


  constructor(private keyCloakService:KeycloakService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.keyCloakService.getToken())
    return from(this.addHeaders(req,next))
    }

    async updateToken(){
    await this.keyCloakService.updateToken(3600);
    }
    async addHeaders(req:HttpRequest<any>,next:HttpHandler){
    if(this.keyCloakService.isTokenExpired(3600)){
      await this.updateToken();
    }
    const authReq=req.clone({
      setHeaders:{
        'Authorization':`Bearer ${await this.keyCloakService.getToken()}`
      }
    })
      return await lastValueFrom(next.handle(authReq));
    }


}
