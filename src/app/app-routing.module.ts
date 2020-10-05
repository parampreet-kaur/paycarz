import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupCustomerFormComponent } from './signup-customer-form/signup-customer-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/paycarz-home', pathMatch: 'full' },
  { path: 'paycarz-home', component: HomePageComponent },
  { path: 'paycarz-home/:selectedComponent', component: HomePageComponent },
  { path: 'paycarz/app-signin-form', component: SigninFormComponent},
  { path: 'paycarz/app-signup-customer-form', component: SignupCustomerFormComponent},
  { path: 'paycarz/app-customer-home-page', component: CustomerHomePageComponent},
  { path: '**', redirectTo: '/paycarz-home', pathMatch: 'full' }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }