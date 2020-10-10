import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgencyModel } from 'src/app/shared/models/agency.model';
import { BookingModel } from 'src/app/shared/models/booking.model';
import { CarModel } from 'src/app/shared/models/car.model';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss'],
  animations: [
    trigger('animateState', [
      state('normal', style({
        'font-size': 'initial'
      })),
      state('enlarge', style({
        'font-size': 'x-large'
      })),
      transition('normal => enlarge', animate(200)),
    ])
  ]
})
export class ViewCarComponent implements OnInit, OnDestroy {

  state = 'normal';
  timer: any;
  bookCar: FormGroup;
  isBooked: boolean;
  errorMessage: string;
  bookingDetails: BookingModel;
  selectedCar: CarModel; 
  imagesUrlList: string[];
  categoryName: string;
  subCategoryName: string;
  carAgency: AgencyModel;
  agenciesSub: Subscription;

  cancelCar: FormGroup;

  categoriesSub: Subscription;
  subCategoriesSub: Subscription;

  constructor(private route: ActivatedRoute, private appDataService: AppDataService, private authService: AuthService) { }

  ngOnInit() {
    this.bookCar = new FormGroup({
      'book' : new FormControl("Book")
    });

    this.cancelCar = new FormGroup({
      'cancel': new FormControl('Cancel Booking')
    })
    this.bookingDetails = JSON.parse(this.route.snapshot.queryParams['bookingDetails']);
    this.selectedCar = JSON.parse(this.route.snapshot.queryParams['car']);
    this.imagesUrlList = JSON.parse(this.route.snapshot.queryParams['imagesUrlList']);

    this.categoriesSub = this.appDataService.getCategories().subscribe(categoriesList => {
      let allCategories = categoriesList;
      let categoryNames = allCategories.filter(category => {
        if(this.selectedCar.categoryId === category.categoryId)
        {
          return category;
        }
      }).map(category => {
        return category.categoryName;
      });
      if(categoryNames)
        this.categoryName = categoryNames[0];
    }, error => {
      this.errorMessage = "Unknown error occurred!";
    });

    this.subCategoriesSub = this.appDataService.getSubCategories().subscribe(subCategoriesList => {
      let allSubCategories = subCategoriesList;
      let subCategoryNames = allSubCategories.filter(subCategory => {
        if(this.selectedCar.subCategoryId === subCategory.subCategoryId)
        {
          return subCategory;
        }
      }).map(subCategory => {
        return subCategory.subCategoryName;
      });
      if(subCategoryNames)
        this.subCategoryName = subCategoryNames[0];
    }, error => {
      this.errorMessage = "Unknown error occurred!";
    });

    this.agenciesSub = this.appDataService.getAgencies().subscribe(agenciesList => {
      let allAgencies = agenciesList;
      let selectedAgency = allAgencies.filter(agency => {
        if(agency.agencyId === this.selectedCar.agencyId){
          return agency;
        }
      });
      this.carAgency = selectedAgency[0];
    }, error => {
      this.errorMessage = "Unknown error occurred!";
    });
  }

  onSubmit(){
    this.isBooked = true;
    this.timer = setTimeout(() => {
      this.state = 'enlarge';
    }, 50);
  }

  onCarCancel(){
    this.isBooked = false;
    this.state = 'normal';
  }

  logout(){
    this.authService.logout(true);
  }

  ngOnDestroy(){
    clearTimeout(this.timer);
    if(this.categoriesSub)
      this.categoriesSub.unsubscribe();
    if(this.subCategoriesSub)
      this.subCategoriesSub.unsubscribe();
    if(this.agenciesSub)
      this.agenciesSub.unsubscribe();
  }

}
