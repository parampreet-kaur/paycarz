import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeedbackModel, FeedbackStatus } from '../shared/models/feedback.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  feedbackForm: FormGroup;
  feedback: FeedbackModel;
  authServiceSub: Subscription;
  errorMessage: string = null;

  constructor(private appDataService: AppDataService, private router: Router) { }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null),
      'contactNo': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'comment' : new FormControl(null, Validators.required),
      'submitBtn' : new FormControl('SUBMIT')
    });
  }

  onSubmit(){
    if(this.feedbackForm.valid){
      this.errorMessage = null;
      this.isLoading = true;
      this.authServiceSub = this.appDataService.getCurrentFeedbackId().subscribe(id => {
        this.feedback = {
          'feedbackId': id.currentValue+1,
          'fname': this.feedbackForm.value.fname,
          'lname': this.feedbackForm.value.lname,
          'contactNo': this.feedbackForm.value.contactNo,
          'email': this.feedbackForm.value.email,
          'comment': this.feedbackForm.value.comment,
          'dateAndTime': new Date().toUTCString(),
          'status': FeedbackStatus.notApproved
        };
        this.appDataService.addNewFeedback(this.feedback);
        this.isLoading = false;
        this.router.navigate(['/paycarz/feedback-submitted']);
      },
      errorMessage => {
        this.isLoading = false;
        this.errorMessage = errorMessage;
      });
    }
  }

  ngOnDestroy(){
    if(this.authServiceSub)
      this.authServiceSub.unsubscribe();
  }

}
