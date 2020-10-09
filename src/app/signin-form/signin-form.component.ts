import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from '../shared/models/booking.model';
import { CustomerModel } from '../shared/models/customer.model';
import { AppDataService } from '../shared/services/app-data.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  errorMessage: string = null;
  authServiceSub: Subscription;
  bookingDetails: BookingModel;

  constructor(private appDataService: AppDataService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required),
      'submitBtn' : new FormControl('SIGN IN')
    });
    this.bookingDetails = this.route.snapshot.queryParams['bookingDetails'];
  }

  onSubmit(){
    if(this.signInForm.valid)
    {
      this.authServiceSub = this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe(responseData => {
          if(this.bookingDetails)
          {
            this.router.navigate(['/paycarz-customer/available-cars'], { queryParams: {bookingDetails: this.bookingDetails}});
          }
          else{
            this.router.navigate(['/paycarz-customer/app-customer-home-page']);
          }
        },
        errorMessage => {
          this.errorMessage = errorMessage;
        });
    }
  }

  ngOnDestroy(){
    if(this.authServiceSub)
      this.authServiceSub.unsubscribe();
  }

}
