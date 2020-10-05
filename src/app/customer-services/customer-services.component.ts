import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer-service.model';
import { CustomerServiceService } from './customer-service.service';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.scss'],
  providers: [CustomerServiceService]
})
export class CustomerServicesComponent implements OnInit {
  customerServices: CustomerService[];

  constructor(private customerServiceService: CustomerServiceService) { }

  ngOnInit() {
    this.customerServices = this.customerServiceService.getCustomerServices();
  }

}
