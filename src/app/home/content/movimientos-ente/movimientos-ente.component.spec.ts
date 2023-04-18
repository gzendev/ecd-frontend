import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosEnteComponent } from './movimientos-ente.component';

describe('MovimientosEnteComponent', () => {
  let component: MovimientosEnteComponent;
  let fixture: ComponentFixture<MovimientosEnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosEnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
