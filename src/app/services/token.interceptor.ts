import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {



  intercept(request: HttpRequest<any>, next: HttpHandler) {
    
    if ((request.url.substring(request.url.length - 13, request.url.length) != "generateToken") && (request.url.substring(request.url.length - 10, request.url.length) != "addNewUser")&& (request.url.substring(request.url.length - 5, request.url.length) != "roles")) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
    }
    else request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return next.handle(request);
  }
}