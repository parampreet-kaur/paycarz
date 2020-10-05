import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer-service.model';

@Component({
  selector: 'app-customer-service-item',
  templateUrl: './customer-service-item.component.html',
  styleUrls: ['./customer-service-item.component.scss']
})
export class CustomerServiceItemComponent implements OnInit {
  @Input() customerService: CustomerService;

  constructor() { }

  getIconClass(){
    return this.customerService.iconClass;
  }

  ngOnInit() {
    
  }

}
