import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliaComponent } from './anomalia.component';

describe('AnomaliaComponent', () => {
  let component: AnomaliaComponent;
  let fixture: ComponentFixture<AnomaliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnomaliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
