import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   product:Array<any>=[];
   bool:Boolean
  constructor(private router:Router,private auth:AuthService) {
   this.bool=!!localStorage.getItem('token')

     if(!this.bool){
      console.log("please login")
      this.router.navigateByUrl('/login')
    }else{
      this.getCart();
    }

  }

  ngOnInit(): void {
  }
getCart(){


  this.auth.getCart().subscribe((data)=>{
    console.log(data)
    this.product=data['cart']
  })
}

confirm(data){
  this.router.navigate(['/product'],{state:{data:data}})
}
}
