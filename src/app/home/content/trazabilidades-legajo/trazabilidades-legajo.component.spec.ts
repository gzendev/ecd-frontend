import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadesLegajoComponent } from './trazabilidades-legajo.component';

describe('TrazabilidadesLegajoComponent', () => {
  let component: TrazabilidadesLegajoComponent;
  let fixture: ComponentFixture<TrazabilidadesLegajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrazabilidadesLegajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadesLegajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
