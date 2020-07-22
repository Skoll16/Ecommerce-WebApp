import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private auth:AuthService) { }
  intercept(req,next){
    let tokenizedReq=req.clone({setHeaders:{
      Authorization:'Bearer'+this.auth.getToken()
    }})
    return next.handle(tokenizedReq)

  }
}
