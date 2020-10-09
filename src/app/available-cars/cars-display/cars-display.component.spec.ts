import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsDisplayComponent } from './cars-display.component';

describe('CarsDisplayComponent', () => {
  let component: CarsDisplayComponent;
  let fixture: ComponentFixture<CarsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
