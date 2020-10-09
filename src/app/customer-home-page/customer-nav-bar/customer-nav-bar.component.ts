import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer-nav-bar',
  templateUrl: './customer-nav-bar.component.html',
  styleUrls: ['./customer-nav-bar.component.scss']
})
export class CustomerNavBarComponent implements OnInit {

  customerLoginId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.customerLoginId = this.authService.user.value.email;
  }

  logout(){
    this.authService.logout();
  }

}
