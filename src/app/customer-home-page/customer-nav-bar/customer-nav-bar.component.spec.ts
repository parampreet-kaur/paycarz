import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNavBarComponent } from './customer-nav-bar.component';

describe('CustomerNavBarComponent', () => {
  let component: CustomerNavBarComponent;
  let fixture: ComponentFixture<CustomerNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
