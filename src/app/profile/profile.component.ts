import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData:any;
  bool:Boolean;
  constructor(private auth:AuthService,private router:Router) {

    this.bool=!!localStorage.getItem('token')

     if(!this.bool){
      console.log("please login")
      this.router.navigateByUrl('/login')
    }else{
    this.userData=localStorage.getItem('user');
    console.log(JSON.parse(this.userData))
    this.userData=JSON.parse(this.userData);
    console.log(this.userData[0]['fname'])
    }
// this.userInfo();
   }

  ngOnInit(): void {
  }
signOut(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  this.router.navigateByUrl('/home')
}
  userInfo(){
    let user={}
    this.auth.userLogin(user).subscribe(res=>{
      console.log(res)
    },err=>{
      if(err instanceof HttpErrorResponse ){
        if(err.status===401){
          this.router.navigateByUrl('/login')
        }
      }
    })
  }
}
