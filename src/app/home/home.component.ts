import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { AuthService } from 'src/services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  searchedProduct:any;
  productList:Array<any>=[];
  user:any;
  c:Boolean;
  constructor(public product:ProductService,
    private auth:AuthService,
    private router:Router) {
   if(localStorage.getItem('token')!=""){
    // console.log(this.router.getCurrentNavigation().extras.state.user);
    // this.user=this.router.getCurrentNavigation().extras.state.user
    // localStorage.setItem('user',this.user);
   }
   this.gettingProduct()

  }
count(data:any){
this.c=true;
console.log(data)
this.router.navigate(['/product'],{state:{data:data}})

}
gettingProduct(){
this.auth.getAllProducts().subscribe((data)=>{
this.productList=data['product'];
console.log(data);
})
}
search(){
  console.log(this.searchedProduct)
  // console.log(searchTerm)
  console.log(this.productList.filter(item =>
    Object.keys(item).some(k => item[k] != null &&
      item[k].toString().toLowerCase()
        .includes(this.searchedProduct.toLowerCase()))
  ))
  if(this.searchedProduct==""){
  this.gettingProduct()
  }
  else{
    this.productList=this.productList.filter(item =>
      Object.keys(item).some(k => item[k] != null &&
        item[k].toString().toLowerCase()
          .includes(this.searchedProduct.toLowerCase()))
    );

    // this.gettingProduct()

  }
}
}
