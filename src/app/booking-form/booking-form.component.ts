import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../shared/models/category.model';
import { CityModel } from '../shared/models/city.model';
import { StateModel } from '../shared/models/state.model';
import { SubCategoryModel } from '../shared/models/sub-category.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  providers: [AppDataService]
})
export class BookingFormComponent implements OnInit {

  bookingForm: FormGroup;

  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  fromStates: StateModel[];
  fromCities: CityModel[];
  toStates: StateModel[];
  toCities: CityModel[];

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.bookingForm = new FormGroup({
      'categories' : new FormControl(null, Validators.required),
      'subCategories' : new FormControl(null, Validators.required),
      'fromStates' : new FormControl(null, Validators.required),
      'fromCities' : new FormControl(null, Validators.required),
      'toStates' : new FormControl(null, Validators.required),
      'toCities' : new FormControl(null, Validators.required),
      'dateOfTravel' : new FormControl(null, Validators.required),
      'registeredUser' : new FormControl('yes', Validators.required),
      'submitBtn' : new FormControl("BOOK CAR")
    });

    this.appDataService.getCategories().subscribe(categoriesList => {
      this.categories = categoriesList;
    });
    this.appDataService.getStates().subscribe(statesList => {
      this.fromStates = statesList;
      this.toStates = statesList;
    });
  }

  getSubCategoriesList(){
    this.appDataService.getSubCategories().subscribe(subCategoryList => {
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
    this.appDataService.getCities().subscribe(citiesList => {
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
    this.appDataService.getCities().subscribe(citiesList => {
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
    console.log(this.bookingForm);
  }

}
