import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoImpresoComponent } from './certificado-impreso.component';

describe('CertificadoImpresoComponent', () => {
  let component: CertificadoImpresoComponent;
  let fixture: ComponentFixture<CertificadoImpresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoImpresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoImpresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
