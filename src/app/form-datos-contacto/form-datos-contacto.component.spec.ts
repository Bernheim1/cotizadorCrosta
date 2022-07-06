import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatosContactoComponent } from './form-datos-contacto.component';

describe('FormDatosContactoComponent', () => {
  let component: FormDatosContactoComponent;
  let fixture: ComponentFixture<FormDatosContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDatosContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatosContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
