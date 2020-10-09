import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDisplayCardComponent } from './car-display-card.component';

describe('CarDisplayCardComponent', () => {
  let component: CarDisplayCardComponent;
  let fixture: ComponentFixture<CarDisplayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDisplayCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
