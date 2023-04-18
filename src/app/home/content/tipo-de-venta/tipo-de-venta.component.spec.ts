import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeVentaComponent } from './tipo-de-venta.component';

describe('TipoDeVentaComponent', () => {
  let component: TipoDeVentaComponent;
  let fixture: ComponentFixture<TipoDeVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDeVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
