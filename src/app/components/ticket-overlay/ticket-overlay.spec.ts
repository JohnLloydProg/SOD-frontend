import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketOverlay } from './ticket-overlay';

describe('TicketOverlay', () => {
  let component: TicketOverlay;
  let fixture: ComponentFixture<TicketOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
