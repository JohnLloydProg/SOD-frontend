import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassBookingPage } from './class-booking-page';

describe('ClassBookingPage', () => {
  let component: ClassBookingPage;
  let fixture: ComponentFixture<ClassBookingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassBookingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassBookingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
