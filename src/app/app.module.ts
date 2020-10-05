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
import { HttpClientModule } from '@angular/common/http';
import { SignupCustomerFormComponent } from './signup-customer-form/signup-customer-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
