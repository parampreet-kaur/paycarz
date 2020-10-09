import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from 'src/app/shared/models/booking.model';
import { CarModel } from 'src/app/shared/models/car.model';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss']
})
export class ViewCarComponent implements OnInit {

  bookingDetails: BookingModel;
  selectedCar: CarModel; 
  imagesUrlList: string[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookingDetails = JSON.parse(this.route.snapshot.queryParams['bookingDetails']);
    this.selectedCar = JSON.parse(this.route.snapshot.queryParams['car']);
    this.imagesUrlList = JSON.parse(this.route.snapshot.queryParams['imagesUrlList']);
  }

}
