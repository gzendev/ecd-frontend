import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoEntregaComponent } from './modo-entrega.component';

describe('ModoEntregaComponent', () => {
  let component: ModoEntregaComponent;
  let fixture: ComponentFixture<ModoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModoEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
