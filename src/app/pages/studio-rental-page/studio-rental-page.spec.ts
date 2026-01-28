import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioRentalPage } from './studio-rental-page';

describe('StudioRentalPage', () => {
  let component: StudioRentalPage;
  let fixture: ComponentFixture<StudioRentalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioRentalPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioRentalPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
