import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.scss']
})
export class CustomerHomePageComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
