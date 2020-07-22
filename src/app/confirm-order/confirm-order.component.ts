import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
    order:Array<any>=[];
    user:any;
    qty:any;
    type:String="";
    img:any;
    debit:String
    cash:String
  constructor(private auth:AuthService,private router:Router) {
    console.log(this.router.getCurrentNavigation().extras.state.order);
    this.order=this.router.getCurrentNavigation().extras.state.order
    console.log(this.order['pimg'])
    this.img=this.order['pimg']
    this.user=localStorage.getItem('user')
    console.log(JSON.parse(this.user))
    this.user=JSON.parse(this.user);

   }

  ngOnInit(): void {
  }


  payment(){
    let order={
      "ptitle":this.order['ptitle'],
      "name":this.user[0]['fname'],
      "email":this.user[0]['email']
    }
    this.auth.sendOrderMail(order).subscribe((data)=>{
      console.log(data)
    })
  }

}
