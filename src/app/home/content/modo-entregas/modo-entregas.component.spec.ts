import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoEntregasComponent } from './modo-entregas.component';

describe('ModoEntregasComponent', () => {
  let component: ModoEntregasComponent;
  let fixture: ComponentFixture<ModoEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModoEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
