import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-form-contratar',
  templateUrl: './form-contratar.component.html',
  styleUrls: ['./form-contratar.component.css']
})
export class FormContratarComponent implements OnInit {

  public form !: FormGroup;
  @Output() cambioStep = new EventEmitter();
  public mostrarSpinner : boolean = false;

  constructor(private fb : FormBuilder, public apiService : ApiService, public dataService : DataService) { 

    this.form = this.fb.group({
      'dni': new FormControl ('', [Validators.required, Validators.min(20000000), Validators.max(65000000)]),
      'email': new FormControl ('', [Validators.required, Validators.email]),
      'telefono': new FormControl ('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  get f () {
    return this.form.controls;
  }

  formCompleto(){

    this.mostrarSpinner = true;

    this.dataService.datosContacto = this.form.getRawValue();

    let date = new Date();
    var horaCotizacion = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`

    let datosEmail =  {
      dni: this.dataService.datosContacto.dni,
      telefono: this.dataService.datosContacto.telefono,
      email: this.dataService.datosContacto.email,
      marca: this.dataService.datosAuto.marca,
      anio: this.dataService.datosAuto.anio,
      modelo: this.dataService.datosAuto.modelo,
      plan: this.dataService.datosAuto.plan.descripcionCobertura,
      horaCotizacion: horaCotizacion
    }

    // this.enviarEmail(datosEmail);

    this.mostrarSpinner = false;

    this.cambioStep.emit(3);
    
  }

  enviarEmail(data : any){
    emailjs.send('defaultEmail','template_pmj4jrq', data, 'Ye0FIL7GWwNX4Xi6p')
    .then((result : EmailJSResponseStatus) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  }


}
