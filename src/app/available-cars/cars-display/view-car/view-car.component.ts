import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgencyOwnerModel } from 'src/app/shared/models/agency-owner.model';
import { AgencyModel } from 'src/app/shared/models/agency.model';
import { BookingModel } from 'src/app/shared/models/booking.model';
import { CarModel } from 'src/app/shared/models/car.model';
import { AppDataService } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss']
})
export class ViewCarComponent implements OnInit, OnDestroy {

  bookCar: FormGroup;
  isBooked: boolean;

  bookingDetails: BookingModel;
  selectedCar: CarModel; 
  imagesUrlList: string[];
  categoryName: string;
  subCategoryName: string;
  carAgency: AgencyModel;
  agenciesSub: Subscription;

  categoriesSub: Subscription;
  subCategoriesSub: Subscription;

  constructor(private route: ActivatedRoute, private appDataService: AppDataService) { }

  ngOnInit() {
    this.bookCar = new FormGroup({
      'book' : new FormControl("Book")
    });
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
    });

    this.agenciesSub = this.appDataService.getAgencies().subscribe(agenciesList => {
      let allAgencies = agenciesList;
      let selectedAgency = allAgencies.filter(agency => {
        if(agency.agencyId === this.selectedCar.agencyId){
          return agency;
        }
      });
      this.carAgency = selectedAgency[0];
    });

    
  }

  onSubmit(){
    this.isBooked = true;
  }

  ngOnDestroy(){
    if(this.categoriesSub)
      this.categoriesSub.unsubscribe();
    if(this.subCategoriesSub)
      this.subCategoriesSub.unsubscribe();
    if(this.agenciesSub)
      this.agenciesSub.unsubscribe();
  }

}
