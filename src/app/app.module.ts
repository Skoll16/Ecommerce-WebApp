import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthService} from '../services/auth.service'
import {ProductService} from '../services/product.service'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {AuthGuard} from '../auth.guard'
import {TokenInterceptorService} from '../services/token-interceptor.service'
import {FormsModule} from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminUploadComponent } from './admin-upload/admin-upload.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    ProductComponent,
    CartComponent,
    ConfirmOrderComponent,
    AdminProfileComponent,
    AdminHomeComponent,
    AdminSignUpComponent,
    AdminProductComponent,
    AdminUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard,AuthService,ProductService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
