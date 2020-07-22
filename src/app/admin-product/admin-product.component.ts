import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  product:Array<any>=[];
  constructor(private router:Router,private auth:AuthService) {
    console.log(this.router.getCurrentNavigation().extras.state.data);
    this.product=this.router.getCurrentNavigation().extras.state.data
  }

  ngOnInit(): void {
  }

}
