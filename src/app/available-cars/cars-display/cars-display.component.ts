import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from 'src/app/shared/models/car.model';

@Component({
  selector: 'app-cars-display',
  templateUrl: './cars-display.component.html',
  styleUrls: ['./cars-display.component.scss']
})
export class CarsDisplayComponent implements OnInit {

  @Input() availableCars: CarModel[];
  
  constructor() { }

  ngOnInit() {
  }

}
