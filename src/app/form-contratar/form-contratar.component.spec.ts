import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContratarComponent } from './form-contratar.component';

describe('FormContratarComponent', () => {
  let component: FormContratarComponent;
  let fixture: ComponentFixture<FormContratarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContratarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContratarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
