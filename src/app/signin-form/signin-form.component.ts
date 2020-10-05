import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModel } from '../shared/models/customer.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  providers: [AppDataService]
})
export class SigninFormComponent implements OnInit {

  signInForm: FormGroup;
  isUserInvalid: boolean = false;

  constructor(private appDataService: AppDataService, private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'submitBtn' : new FormControl('SIGN IN')
    });
  }

  onSubmit(){
    if(this.signInForm.valid)
    {
      this.isValidCustomer();
    }
  }

  isValidCustomer(){
    let validCustomers: CustomerModel[];
    this.appDataService.getCustomers().subscribe(customersList => {
      
      validCustomers = customersList.filter(customer => {
        if(customer.username === this.signInForm.value.username && customer.password === this.signInForm.value.password)
        {
          return customer;
        }
      });

      if(validCustomers.length != 0)
      {
        this.isUserInvalid = false;
        this.router.navigate(['/paycarz/app-customer-home-page'], {queryParams: { customerId: validCustomers[0].customerId}});
      }
      else{
        this.isUserInvalid = true;
      }
    });
  }

}
