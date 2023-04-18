import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcesionarioEnteComponent } from './concesionario-ente.component';

describe('ConcesionarioEnteComponent', () => {
  let component: ConcesionarioEnteComponent;
  let fixture: ComponentFixture<ConcesionarioEnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcesionarioEnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcesionarioEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});