import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchPage } from './merch-page';

describe('MerchPage', () => {
  let component: MerchPage;
  let fixture: ComponentFixture<MerchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
