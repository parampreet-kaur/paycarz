import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCustomerFormComponent } from './signup-customer-form.component';

describe('SignupCustomerFormComponent', () => {
  let component: SignupCustomerFormComponent;
  let fixture: ComponentFixture<SignupCustomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupCustomerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
