import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefcoTableComponent } from './gefco-table.component';

describe('GefcoTableComponent', () => {
  let component: GefcoTableComponent;
  let fixture: ComponentFixture<GefcoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GefcoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GefcoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
