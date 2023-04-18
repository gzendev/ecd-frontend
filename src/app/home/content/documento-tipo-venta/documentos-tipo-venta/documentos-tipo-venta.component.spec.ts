import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosTipoVentaComponent } from './documentos-tipo-venta.component';

describe('DocumentosTipoVentaComponent', () => {
  let component: DocumentosTipoVentaComponent;
  let fixture: ComponentFixture<DocumentosTipoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosTipoVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosTipoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
