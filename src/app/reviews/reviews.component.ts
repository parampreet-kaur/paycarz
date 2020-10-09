import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackModel, FeedbackStatus } from '../shared/models/feedback.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  feedbacksList: FeedbackModel[];
  feedbacksSub: Subscription;

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.feedbacksSub = this.appDataService.getFeedbacks().subscribe(feedbacksList => {
      let allFeedbacks = feedbacksList;
      this.feedbacksList = allFeedbacks.filter(feedback => {
        if(feedback.status == FeedbackStatus.approved)
        {
          return feedback;
        }
      });
      this.feedbacksList = this.feedbacksList.slice(this.feedbacksList.length - 3, this.feedbacksList.length);
    });
  }

  ngOnDestroy(){
    if(this.feedbacksSub)
      this.feedbacksSub.unsubscribe();
  }

}
