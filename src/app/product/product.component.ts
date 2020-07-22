import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
product:Array<any>=[];
cartDetails:any;
confirmCart:any;
  constructor(private router:Router,private auth:AuthService) {
    console.log(this.router.getCurrentNavigation().extras.state.data);
    this.product=this.router.getCurrentNavigation().extras.state.data
    this.confirmCart=this.product
    console.log(this.product['pImg'])
  }

  ngOnInit(): void {
  }
cart(){
 this.cartDetails={
 pcategory:this.product['pcategory'],
 userID:"1111",
 ptitle:this.product['pcategory'],
 poffer:this.product['ptitle'],
 pdescription:this.product['pdescription'],
 pimg:this.product['pimg'],
 pdate:this.product['pdate'],
 pcompany:this.product['pcompany']
  }
this.auth.cart(this.cartDetails).subscribe((data)=>{
  console.log(data)
  this.router.navigate(['/cart'],{state:{data:data}})
})
}
confirm(){
  console.log(this.cartDetails )
  this.router.navigate(['/confirmOrder'],{state:{order:this.confirmCart}})
}
}
