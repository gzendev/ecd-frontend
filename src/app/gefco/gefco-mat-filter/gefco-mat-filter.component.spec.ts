import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefcoMatFilterComponent } from './gefco-mat-filter.component';

describe('GefcoMatFilterComponent', () => {
  let component: GefcoMatFilterComponent;
  let fixture: ComponentFixture<GefcoMatFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GefcoMatFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GefcoMatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
