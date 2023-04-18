import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajosLiberacionComponent } from './legajos-liberacion.component';

describe('LegajosLiberacionComponent', () => {
  let component: LegajosLiberacionComponent;
  let fixture: ComponentFixture<LegajosLiberacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegajosLiberacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegajosLiberacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
