import { Injectable } from '@angular/core';
import { CanActivate, Router, Route} from '@angular/router';
import {AuthService} from './services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private auth:AuthService){}

  canActivate():boolean{
    if(this.auth.loggedIn()){
      return true
    }
    else{
      this.router.navigateByUrl('/login')
      return false;
    }
  }
  

}
