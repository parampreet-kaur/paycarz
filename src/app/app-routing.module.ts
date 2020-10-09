import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AvailableCarsComponent } from './available-cars/available-cars.component';
import { ViewCarComponent } from './available-cars/cars-display/view-car/view-car.component';
import { CustomerBookingFormComponent } from './customer-home-page/customer-booking-form/customer-booking-form.component';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaycarzHomeComponent } from './paycarz-home/paycarz-home.component';
import { AuthGuard } from './shared/auth-guards/auth.guard';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupCustomerFormComponent } from './signup-customer-form/signup-customer-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/paycarz/home', pathMatch: 'full' },
  { path: 'paycarz', component: PaycarzHomeComponent, children: [
    { path: 'app-signin-form', component: SigninFormComponent},
    { path: 'app-signup-customer-form', component: SignupCustomerFormComponent},
    { path: 'home', component: HomePageComponent },
    { path: 'home/:selectedComponent', component: HomePageComponent }
  ]},
  { path: 'paycarz-customer', 
    component: CustomerHomePageComponent, 
    canActivate: [AuthGuard],
    children: [
    { path: 'app-customer-home-page', component: CustomerBookingFormComponent},
    { path: 'available-cars', component: AvailableCarsComponent},
    { path: 'view-car', component: ViewCarComponent}
  ]},
  { path: '**', redirectTo: '/paycarz/home', pathMatch: 'full' }
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