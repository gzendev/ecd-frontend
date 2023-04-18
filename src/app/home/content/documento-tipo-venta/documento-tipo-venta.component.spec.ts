import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoTipoVentaComponent } from './documento-tipo-venta.component';

describe('DocumentoTipoVentaComponent', () => {
  let component: DocumentoTipoVentaComponent;
  let fixture: ComponentFixture<DocumentoTipoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoTipoVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoTipoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
