import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosImpresosComponent } from './certificados-impresos.component';

describe('CertificadosImpresosComponent', () => {
  let component: CertificadosImpresosComponent;
  let fixture: ComponentFixture<CertificadosImpresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadosImpresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosImpresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
