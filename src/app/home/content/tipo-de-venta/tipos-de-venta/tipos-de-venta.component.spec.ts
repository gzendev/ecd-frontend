import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeVentaComponent } from './tipos-de-venta.component';

describe('TiposDeVentaComponent', () => {
  let component: TiposDeVentaComponent;
  let fixture: ComponentFixture<TiposDeVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDeVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDeVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
