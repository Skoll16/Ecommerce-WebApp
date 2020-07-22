import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  searchedProduct:any;
  productList:Array<any>=[];
  user:any;
  c:Boolean;
  constructor( private auth:AuthService,
    private router:Router) {
      this.gettingProduct();
    }

  ngOnInit(): void {
  }
  gettingProduct(){
    this.auth.getAdminProduct().subscribe((data)=>{
    this.productList=data['product'];
    console.log(data);
    })
    }
  count(data:any){
    this.c=true;
    console.log(data)
    this.router.navigate(['/adminProduct'],{state:{data:data}})
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
