import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBloqueoComponent } from './resultados-bloqueo.component';

describe('ResultadosBloqueoComponent', () => {
  let component: ResultadosBloqueoComponent;
  let fixture: ComponentFixture<ResultadosBloqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosBloqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosBloqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
