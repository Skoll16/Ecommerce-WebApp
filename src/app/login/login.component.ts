import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   Email:String="";
   Password:String="";
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){

    let log={
      "email":this.Email,
      "password":this.Password
    }
    console.log(log)
    this.auth.adminLogin(log).subscribe(res=>{
      console.log(res)
      localStorage.setItem('token',res.token);
      this.auth.getUserData(log).subscribe(result=>{
        console.log(result['user'])
        localStorage.setItem('user', JSON.stringify(result['user']))
      })
      this.router.navigateByUrl('/home')
    },err=>{
      console.log(err)
    })
    // this.auth.userLogin() token save krna hai ismai bhi same like signup
  }
  navi(){
    this.router.navigateByUrl('/signUp')
  }

  navi2(){
    this.router.navigateByUrl('/adminSignUp')
  }
}
