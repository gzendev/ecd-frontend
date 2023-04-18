import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoBloqueoComponent } from './resultado-bloqueo.component';

describe('ResultadoBloqueoComponent', () => {
  let component: ResultadoBloqueoComponent;
  let fixture: ComponentFixture<ResultadoBloqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoBloqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoBloqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
