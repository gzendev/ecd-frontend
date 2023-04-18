import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BocaEntregasComponent } from './boca-entregas.component';

describe('BocaEntregasComponent', () => {
  let component: BocaEntregasComponent;
  let fixture: ComponentFixture<BocaEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BocaEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BocaEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
