import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/shared/models/booking.model';
import { CarModel } from 'src/app/shared/models/car.model';
import { AppDataService } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-car-display-card',
  templateUrl: './car-display-card.component.html',
  styleUrls: ['./car-display-card.component.scss']
})
export class CarDisplayCardComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  @Input() car: CarModel;
  carImageSub: Subscription;
  imagesUrlList: string[];
  imageUrl: string;
  bookingDetails: BookingModel;
  
  viewCar: FormGroup;

  constructor(private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.viewCar = new FormGroup({
      'view' : new FormControl("View")
    });
    this.isLoading = true;
    this.carImageSub = this.appDataService.getCarImages().subscribe(carImagesList => {
      let allCarImages = carImagesList;
      let filteredImages = allCarImages.filter(carImage => {
        if(carImage.carId === this.car.carId){
          return carImage.picture;
        }
      }).map(carImage => {
        return carImage.picture;
      });
      this.imagesUrlList = filteredImages;
      this.imageUrl = filteredImages[0];
      this.isLoading = false;
    });
    this.bookingDetails = JSON.parse(this.route.snapshot.queryParams['bookingDetails']);
  }

  onSubmit(){
    this.bookingDetails.carId = this.car.carId;
    this.router.navigate(
      ['/paycarz-customer/view-car'],
      { queryParams: 
        {
          bookingDetails: JSON.stringify(this.bookingDetails), 
          car: JSON.stringify(this.car),
          imagesUrlList: JSON.stringify(this.imagesUrlList)
        }
      });
  }

  ngOnDestroy(){
    if(this.carImageSub){
      this.carImageSub.unsubscribe();
    }
  }
}
