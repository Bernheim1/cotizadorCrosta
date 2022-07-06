import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ServiceApiService } from '../service-api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  faCircleExclamation = faCircleExclamation;
  public form !: FormGroup
  @Output() cambioStep = new EventEmitter();
  

  constructor(private fb : FormBuilder, public serviceApi : ServiceApiService) { 
    this.form = this.fb.group({
      'marca': new FormControl ('', Validators.required),
      'anio': new FormControl ('', [Validators.required, Validators.min(1900), Validators.max(2024)]),
      'email': new FormControl ('', [Validators.required, Validators.email]),
      'modelo': new FormControl ('', Validators.required),
      'localidad': new FormControl ('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  get f () {
    return this.form.controls;
  }

  formCompleto(item : any){
    this.serviceApi.datosAuto = this.form.getRawValue();
    this.cambioStep.emit(item);
  }

  
}
