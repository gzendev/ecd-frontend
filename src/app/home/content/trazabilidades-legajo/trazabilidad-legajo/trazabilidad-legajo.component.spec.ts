import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadLegajoComponent } from './trazabilidad-legajo.component';

describe('TrazabilidadLegajoComponent', () => {
  let component: TrazabilidadLegajoComponent;
  let fixture: ComponentFixture<TrazabilidadLegajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrazabilidadLegajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadLegajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
