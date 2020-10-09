import { Component, Input, OnInit } from '@angular/core';
import { FeedbackModel } from 'src/app/shared/models/feedback.model';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {

  @Input() feedback: FeedbackModel;
  constructor() { }

  ngOnInit() {
  }

}
