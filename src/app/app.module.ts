import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { CustomerServiceItemComponent } from './customer-services/customer-service-item/customer-service-item.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryItemComponent } from './gallery/gallery-item/gallery-item.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { HomePageHeaderComponent } from './home-page-header/home-page-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupCustomerFormComponent } from './signup-customer-form/signup-customer-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';
import { CustomerNavBarComponent } from './customer-home-page/customer-nav-bar/customer-nav-bar.component';
import { PaycarzHomeComponent } from './paycarz-home/paycarz-home.component';
import { AvailableCarsComponent } from './available-cars/available-cars.component';
import { CustomerBookingFormComponent } from './customer-home-page/customer-booking-form/customer-booking-form.component';
import { CarsDisplayComponent } from './available-cars/cars-display/cars-display.component';
import { CarDisplayCardComponent } from './available-cars/cars-display/car-display-card/car-display-card.component';
import { AppDataService } from './shared/services/app-data.service';
import { AuthService } from './shared/services/auth.service';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { AuthGuard } from './shared/auth-guards/auth.guard';
import { ViewCarComponent } from './available-cars/cars-display/view-car/view-car.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SliderDirective } from './shared/directives/slider.directive';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CustomerServicesComponent,
    CustomerServiceItemComponent,
    HomePageComponent,
    GalleryComponent,
    GalleryItemComponent,
    ReviewsComponent,
    AboutUsComponent,
    BookingFormComponent,
    HomePageHeaderComponent,
    SignupCustomerFormComponent,
    SigninFormComponent,
    CustomerHomePageComponent,
    CustomerNavBarComponent,
    PaycarzHomeComponent,
    AvailableCarsComponent,
    CustomerBookingFormComponent,
    CarsDisplayComponent,
    CarDisplayCardComponent,
    ViewCarComponent,
    FooterComponent,
    SliderDirective,
    ContactUsComponent,
    ReviewItemComponent,
    LoadingSpinnerComponent,
    LoadingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AppDataService, AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
