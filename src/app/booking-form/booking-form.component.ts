import { JsonPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel, BookingStatus } from '../shared/models/booking.model';
import { CategoryModel } from '../shared/models/category.model';
import { CityModel } from '../shared/models/city.model';
import { StateModel } from '../shared/models/state.model';
import { SubCategoryModel } from '../shared/models/sub-category.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit, OnDestroy {

  @Input() requireLogIn: boolean;
  bookingDetails: BookingModel;
  bookingForm: FormGroup;

  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  fromStates: StateModel[];
  fromCities: CityModel[];
  toStates: StateModel[];
  toCities: CityModel[];

  categoriesSub: Subscription;
  statesSub: Subscription;
  subCategoriesSub: Subscription;
  toCitiesSub: Subscription;
  fromCitiesSub: Subscription;

  constructor(private appDataService: AppDataService, private router: Router) { }

  ngOnInit() {
    this.bookingForm = new FormGroup({
      'categories' : new FormControl(null, Validators.required),
      'subCategories' : new FormControl(null, Validators.required),
      'fromStates' : new FormControl(null, Validators.required),
      'fromCities' : new FormControl(null, Validators.required),
      'toStates' : new FormControl(null, Validators.required),
      'toCities' : new FormControl(null, Validators.required),
      'dateOfTravel' : new FormControl(null, Validators.required),
      'registeredUser' : new FormControl('yes'),
      'submitBtn' : new FormControl("BOOK CAR")
    });

    this.categoriesSub = this.appDataService.getCategories().subscribe(categoriesList => {
      this.categories = categoriesList;
    });
    this.statesSub = this.appDataService.getStates().subscribe(statesList => {
      this.fromStates = statesList;
      this.toStates = statesList;
    });
  }

  getSubCategoriesList(){
    this.subCategoriesSub = this.appDataService.getSubCategories().subscribe(subCategoryList => {
      let allSubCategories = subCategoryList;

      this.subCategories = allSubCategories.filter((subCategory) => {
        if(subCategory.categoryId === this.bookingForm.value.categories){
            return subCategory;
        }
      });
    });
    this.bookingForm.patchValue({
      'subCategories': this.subCategories
    });
    this.bookingForm.patchValue({
      'subCategories': null
    });
  }

  getFromCitiesList(){
    this.fromCitiesSub = this.appDataService.getCities().subscribe(citiesList => {
        let allCities = citiesList;

        this.fromCities = allCities.filter((city) => {
          if(city.stateId === this.bookingForm.value.fromStates){
              return city;
          }
      });
      
      this.bookingForm.patchValue({
        'fromCities': this.fromCities
      });
      this.bookingForm.patchValue({
        'fromCities': null
      });
    });
  }

  getToCitiesList(){
    this.toCitiesSub = this.appDataService.getCities().subscribe(citiesList => {
        let allCities = citiesList;

        this.toCities = allCities.filter((city) => {
          if(city.stateId === this.bookingForm.value.toStates){
              return city;
          }
      });
      
      this.bookingForm.patchValue({
        'toCities': this.toCities
      });
      this.bookingForm.patchValue({
        'toCities': null
      });
    });
  }

  onSubmit(){
    if(this.bookingForm.valid)
    {
      //preparing initial booking details
      this.bookingDetails = {
        'bookingId': 0,
        'customerId': 0,
        'carId': 0,
        'fromCityId': this.bookingForm.value.fromCities,
        'toCityId': this.bookingForm.value.toCities,
        'dateOfTravel': this.bookingForm.value.dateOfTravel,
        'dateAndTime': new Date().toUTCString(),
        'status': BookingStatus.pending,
        'categoryId': this.bookingForm.value.categories,
        'subCategoryId': this.bookingForm.value.subCategories
      };
      if(this.requireLogIn)
      {
        if(this.bookingForm.value.registeredUser === 'yes')
        {
          this.router.navigate(['/paycarz/app-signin-form'], { queryParams: {bookingDetails: JSON.stringify(this.bookingDetails)}});
        }
        else
        {
          this.router.navigate(['/paycarz/app-signup-customer-form'], { queryParams: {bookingDetails: JSON.stringify(this.bookingDetails)}});
        }
      }
      else
      {
        this.router.navigate(['/paycarz-customer/available-cars'], { queryParams: {bookingDetails: JSON.stringify(this.bookingDetails)}});
      }
    }
    
  }

  ngOnDestroy(){
    if(this.categoriesSub)
      this.categoriesSub.unsubscribe();
    if(this.statesSub)
      this.statesSub.unsubscribe();
    if(this.subCategoriesSub)
      this.subCategoriesSub.unsubscribe();
    if(this.fromCitiesSub)
      this.fromCitiesSub.unsubscribe();
    if(this.toCitiesSub)
      this.toCitiesSub.unsubscribe();
  }

}
