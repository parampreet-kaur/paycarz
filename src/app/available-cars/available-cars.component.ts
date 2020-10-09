import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from '../shared/models/booking.model';
import { CarModel } from '../shared/models/car.model';
import { AppDataService } from '../shared/services/app-data.service';

@Component({
  selector: 'app-available-cars',
  templateUrl: './available-cars.component.html',
  styleUrls: ['./available-cars.component.scss']
})
export class AvailableCarsComponent implements OnInit, OnDestroy {

  bookingDetails: BookingModel;
  availableCars: CarModel[];
  carsSub: Subscription;

  constructor(private route: ActivatedRoute, private appDataService: AppDataService) { }

  ngOnInit() {
    this.bookingDetails = JSON.parse(this.route.snapshot.queryParams['bookingDetails']);

    this.carsSub = this.appDataService.getCars().subscribe(carsList => {
      let allCars = carsList;
      this.availableCars = allCars.filter((car) => {
        if(car.categoryId === this.bookingDetails.categoryId && car.subCategoryId === this.bookingDetails.subCategoryId){
            return car;
        }
      });
    });
  }

  ngOnDestroy(){
    if(this.carsSub){
      this.carsSub.unsubscribe();
    }
  }

}
