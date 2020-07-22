import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
   fname:String;
   lname:String;
   email:String;
   phone:String;
   password:String;
   address:String;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signUp(){
    let user={
      "fname":this.fname,
      "lname":this.lname,
      "email":this.email,
      "phone":this.phone,
      "password":this.password,
      "address":this.address
    }

    this.auth.userRegistration(user).subscribe(res=>{
      console.log(res)
      localStorage.setItem('token',res.token)
      this.auth.getUserData(user).subscribe(result=>{
        console.log(result['user'])
        localStorage.setItem('user', JSON.stringify(result['user']))
      })
      this.auth.sendRegistrationMail(user).subscribe((data)=>{
        console.log(data);
      })
      this.router.navigate(['/home'],{state:{user:res}})
    },err=>{
      console.log(err)
    })
  }
}
