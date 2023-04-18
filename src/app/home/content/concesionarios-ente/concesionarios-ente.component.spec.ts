import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcesionariosEnteComponent } from './concesionarios-ente.component';

describe('ConcesionariosEnteComponent', () => {
  let component: ConcesionariosEnteComponent;
  let fixture: ComponentFixture<ConcesionariosEnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcesionariosEnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcesionariosEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});