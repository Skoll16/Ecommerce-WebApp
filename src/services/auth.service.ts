import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable()
export class AuthService {
 private userRegisterUrl="http://localhost:3000/skoll/userRegistration"
 private adminRegisterUrl="http://localhost:3000/skoll/adminRegistration"
 private userLoginUrl="http://localhost:3000/skoll/userLogin"
 private adminLoginUrl="http://localhost:3000/skoll/adminLogin"
 private productsUrl="http://localhost:3000/skoll/getAdminsProducts"
 private AdminProductsUrl="http://localhost:3000/skoll/getAdminProduct"
 private AdminProductUploadUrl="http://localhost:3000/skoll/adminProduct"

 private cartUrl="http://localhost:3000/skoll/cartItems"
 private getCartUrl="http://localhost:3000/skoll/getCart"
 private getUserUrl="http://localhost:3000/skoll/getUser"
 private getAdminUrl="http://localhost:3000/skoll/getAdmin"
private sendRegistrationMailUrl="http://localhost:3000/skoll/sendRegistrationMail"
private sendOrderMailUrl="http://localhost:3000/skoll/sendOrderMail"

 constructor(private http:HttpClient) { }

  userRegistration(user){
    return this.http.post<any>(this.userRegisterUrl,user)
  }
  adminRegistration(admin){
    return this.http.post<any>(this.adminRegisterUrl,admin)
  }

  userLogin(user){
    return this.http.post<any>(this.userLoginUrl,user)
  }
  adminLogin(admin){
    return this.http.post<any>(this.adminLoginUrl,admin)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }

  getAllProducts(){
    return this.http.get<any>(this.productsUrl)
  }
  getAdmin(admin){
    return this.http.post<any>(this.getAdminUrl,admin)
  }
  cart(cart){
  return this.http.post<any>(this.cartUrl,cart)
  }
  getCart(){
    return this.http.get<any>(this.getCartUrl)
}
getUserData(user){
  return this.http.post<any>(this.getUserUrl,user)
}

sendRegistrationMail(user){
  return this.http.post<any>(this.sendRegistrationMailUrl,user)
}
sendOrderMail(order){
  return this.http.post<any>(this.sendOrderMailUrl,order)
}
getAdminProduct(){
  return this.http.get<any>(this.AdminProductsUrl)
}
adminUploadProduct(product){
  return this.http.post<any>(this.AdminProductUploadUrl,product)
}
}
