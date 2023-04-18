import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajoLiberacionComponent } from './legajo-liberacion.component';

describe('LegajoLiberacionComponent', () => {
  let component: LegajoLiberacionComponent;
  let fixture: ComponentFixture<LegajoLiberacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegajoLiberacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegajoLiberacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
