import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.css']
})
export class AdminSignUpComponent implements OnInit {
  fname:String;
  lname:String;
  email:String;
  phone:String;
  password:String;
  address:String;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }
signUp(){
  let admin={
    "fname":this.fname,
    "lname":this.lname,
    "email":this.email,
    "phone":this.phone,
    "password":this.password,
    "address":this.address
  }

  this.auth.adminRegistration(admin).subscribe((data)=>{
    console.log(data)
    localStorage.setItem('token',data.token)
     this.auth.getAdmin(admin).subscribe((res)=>{
       console.log(admin)
       localStorage.setItem('admin', JSON.stringify(res['admin']))
       this.auth.sendRegistrationMail(admin).subscribe((data)=>{
        console.log(data);
      })
      this.router.navigate(['/adminHome'],{state:{admin:res}})
     })
  })
}
}
