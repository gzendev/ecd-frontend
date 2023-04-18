import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefacturacionesComponent } from './refacturaciones.component';

describe('RefacturacionesComponent', () => {
  let component: RefacturacionesComponent;
  let fixture: ComponentFixture<RefacturacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefacturacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefacturacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
