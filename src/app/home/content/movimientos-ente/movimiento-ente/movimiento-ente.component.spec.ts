import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoEnteComponent } from './movimiento-ente.component';

describe('MovimientoEnteComponent', () => {
  let component: MovimientoEnteComponent;
  let fixture: ComponentFixture<MovimientoEnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoEnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
