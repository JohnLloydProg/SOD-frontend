import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesClassesPage } from './class-types-classes-page';

describe('TypesClassesPage', () => {
  let component: TypesClassesPage;
  let fixture: ComponentFixture<TypesClassesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesClassesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesClassesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
