import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceApiService } from '../service-api.service';

@Component({
  selector: 'app-form-datos-contacto',
  templateUrl: './form-datos-contacto.component.html',
  styleUrls: ['./form-datos-contacto.component.css']
})
export class FormDatosContactoComponent implements OnInit {

  public form !: FormGroup;
  @Output() cambioStep = new EventEmitter();

  constructor(private fb : FormBuilder, public serviceApi : ServiceApiService) { 
    this.form = this.fb.group({
      'localidadResidencia': new FormControl ('', Validators.required),
      'codigoPostal': new FormControl ('', Validators.required),
      'numCaracteristica': new FormControl ('', Validators.required),
      'numTelefono': new FormControl ('', Validators.required),
      'calle': new FormControl ('', Validators.required),
      'numCalle': new FormControl ('', Validators.required),
      'piso': new FormControl (''),
      'depto': new FormControl (''),
    });
  }

  ngOnInit(): void {
  }

  get f () {
    return this.form.controls;
  }

  formCompleto(item : any){
    this.serviceApi.datosContacto = this.form.getRawValue();
    let numeroCompleto = "0" + this.serviceApi.datosContacto.numCaracteristica + "15" + this.serviceApi.datosContacto.numTelefono;
    this.serviceApi.datosContacto.numCompleto = numeroCompleto;
    console.log(this.serviceApi.datosContacto);
    this.cambioStep.emit(item);
  }
}
