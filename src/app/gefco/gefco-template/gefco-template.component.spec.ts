import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefcoTemplateComponent } from './gefco-template.component';

describe('GefcoTemplateComponent', () => {
  let component: GefcoTemplateComponent;
  let fixture: ComponentFixture<GefcoTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GefcoTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GefcoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
