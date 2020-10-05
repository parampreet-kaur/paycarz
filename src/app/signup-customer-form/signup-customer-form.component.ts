import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityModel } from '../shared/models/city.model';
import { CountryModel } from '../shared/models/country.model';
import { CustomerModel } from '../shared/models/customer.model';
import { StateModel } from '../shared/models/state.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-signup-customer-form',
  templateUrl: './signup-customer-form.component.html',
  styleUrls: ['./signup-customer-form.component.scss'],
  providers: [AppDataService]
})
export class SignupCustomerFormComponent implements OnInit {

  customerSignUpForm: FormGroup;
  countries: CountryModel[];
  states: StateModel[];
  cities: CityModel[];

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.customerSignUpForm = new FormGroup({
      'customerName' : new FormControl(null, Validators.required),
      'emailId' : new FormControl(null, [Validators.required, Validators.email]),
      'mobileNo' : new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]),
      'gender' : new FormControl('male', Validators.required),
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'country' : new FormControl(null, Validators.required),
      'state' : new FormControl(null, Validators.required),
      'city' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, Validators.required),
      'submitBtn' : new FormControl('SUBMIT DETAILS')
    });

    this.appDataService.getCountries().subscribe(countriesList => {
      this.countries = countriesList;
    });

  }

  getStatesList(){
    this.appDataService.getStates().subscribe(statesList => {
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
    this.appDataService.getCities().subscribe(citiesList => {
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
      this.appDataService.getCurrentCustomerId().subscribe(id => {
        let customer: CustomerModel = {
          'customerId': id+1,
          'customerName': this.customerSignUpForm.value.customerName,
          'emailId': this.customerSignUpForm.value.emailId, 
          'mobileNo': this.customerSignUpForm.value.mobileNo,
          'gender': this.customerSignUpForm.value.gender,
          'username': this.customerSignUpForm.value.username,
          'password': this.customerSignUpForm.value.customerName, 
          'countryId': this.customerSignUpForm.value.country,
          'stateId': this.customerSignUpForm.value.state, 
          'cityId': this.customerSignUpForm.value.city,
          'address': this.customerSignUpForm.value.address 
        };
        this.appDataService.addNewCustomer(customer);
      });
      
    }
  }

}
