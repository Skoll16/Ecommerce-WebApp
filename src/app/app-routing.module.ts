import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/auth.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminUploadComponent } from './admin-upload/admin-upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard] },
  {path:'product',component:ProductComponent},
  {path:'cart',component:CartComponent, canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'confirmOrder',component:ConfirmOrderComponent},
  {path:'adminSignUp',component:AdminSignUpComponent},
  {path:'adminHome',component:AdminHomeComponent},
  {path:'adminProfile',component:AdminProfileComponent},
  {path:'adminProduct',component:AdminProductComponent},
  {path:'adminUpload',component:AdminUploadComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
