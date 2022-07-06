import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceApiService } from '../service-api.service';

@Component({
  selector: 'app-form-contratar',
  templateUrl: './form-contratar.component.html',
  styleUrls: ['./form-contratar.component.css']
})
export class FormContratarComponent implements OnInit {

  public form !: FormGroup;
  @Output() cambioStep = new EventEmitter();

  constructor(private fb : FormBuilder, public serviceApi : ServiceApiService) { 
    this.form = this.fb.group({
      'dni': new FormControl ('', [Validators.required, Validators.min(20000000), Validators.max(65000000)]),
      'sexo': new FormControl ('', Validators.required),
      'nombre': new FormControl ('', Validators.required),
      'apellido': new FormControl ('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  get f () {
    return this.form.controls;
  }

  formCompleto(item : any){
    this.serviceApi.datosCliente = this.form.getRawValue();
    this.cambioStep.emit(item);
  }


}
