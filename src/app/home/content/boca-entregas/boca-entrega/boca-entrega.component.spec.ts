import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BocaEntregaComponent } from './boca-entrega.component';

describe('BocaEntregaComponent', () => {
  let component: BocaEntregaComponent;
  let fixture: ComponentFixture<BocaEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BocaEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BocaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
