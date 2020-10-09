import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from '../shared/models/booking.model';
import { CityModel } from '../shared/models/city.model';
import { CountryModel } from '../shared/models/country.model';
import { CustomerModel } from '../shared/models/customer.model';
import { StateModel } from '../shared/models/state.model';
import { AppDataService } from '../shared/services/app-data.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup-customer-form',
  templateUrl: './signup-customer-form.component.html',
  styleUrls: ['./signup-customer-form.component.scss'],
})
export class SignupCustomerFormComponent implements OnInit, OnDestroy {

  customerSignUpForm: FormGroup;
  countries: CountryModel[];
  states: StateModel[];
  cities: CityModel[];
  errorMessage: string = null;
  bookingDetails: BookingModel;

  statesSub: Subscription;
  citiesSub: Subscription;
  authServiceSub: Subscription;

  constructor(private appDataService: AppDataService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerSignUpForm = new FormGroup({
      'customerName' : new FormControl(null, Validators.required),
      'mobileNo' : new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]),
      'gender' : new FormControl('male', Validators.required),
      'emailId' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'country' : new FormControl(null, Validators.required),
      'state' : new FormControl(null, Validators.required),
      'city' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, Validators.required),
      'submitBtn' : new FormControl('SUBMIT DETAILS')
    });

    this.appDataService.getCountries().subscribe(countriesList => {
      this.countries = countriesList;
    });

    this.bookingDetails = this.route.snapshot.queryParams['bookingDetails'];

  }

  getStatesList(){
    this.statesSub = this.appDataService.getStates().subscribe(statesList => {
        let allStates = statesList;

        this.states = allStates.filter((state) => {
          if(state.countryId === this.customerSignUpForm.value.country){
              return state;
          }
      });
      
      this.customerSignUpForm.patchValue({
        'state': this.states
      });
      this.customerSignUpForm.patchValue({
        'state': null
      });
    });
  }

  getCitiesList(){
    this.citiesSub = this.appDataService.getCities().subscribe(citiesList => {
        let allCities = citiesList;

        this.cities = allCities.filter((city) => {
          if(city.stateId === this.customerSignUpForm.value.state){
              return city;
          }
      });
      
      this.customerSignUpForm.patchValue({
        'city': this.cities
      });
      this.customerSignUpForm.patchValue({
        'city': null
      });
    });
  }

  onSubmit(){
    if(this.customerSignUpForm.valid)
    {
      this.authServiceSub = this.authService.signUp(this.customerSignUpForm.value.emailId, this.customerSignUpForm.value.password)
        .subscribe(responseData => {
          this.errorMessage = null;
          this.appDataService.getCurrentCustomerId().subscribe(id => {
            let customer: CustomerModel = {
              'customerId': id.currentValue+1,
              'customerName': this.customerSignUpForm.value.customerName,
              'mobileNo': this.customerSignUpForm.value.mobileNo,
              'gender': this.customerSignUpForm.value.gender,
              'emailId': this.customerSignUpForm.value.emailId,
              'password': this.customerSignUpForm.value.password, 
              'countryId': this.customerSignUpForm.value.country,
              'stateId': this.customerSignUpForm.value.state, 
              'cityId': this.customerSignUpForm.value.city,
              'address': this.customerSignUpForm.value.address 
            };
            this.appDataService.addNewCustomer(customer);

            if(this.bookingDetails){
              this.router.navigate(['/paycarz-customer/available-cars'], { queryParams: {bookingDetails: this.bookingDetails}});
            }
            else{
              this.router.navigate(['/paycarz-customer/app-customer-home-page']);
            }
          });
        },
        errorMessage => {
          this.errorMessage = errorMessage;
        });
      
    }
  }

  ngOnDestroy(){
    if(this.statesSub)
      this.statesSub.unsubscribe();
    if(this.citiesSub)
      this.citiesSub.unsubscribe();
    if(this.authServiceSub)
      this.authServiceSub.unsubscribe();
  }

}
