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

    this.apiService.enviarEmail(this.dataService.datosContacto.dni,this.dataService.datosContacto.telefono,this.dataService.datosContacto.email,
      this.dataService.datosAuto.marca,this.dataService.datosAuto.anio,this.dataService.datosAuto.modelo,this.dataService.datosAuto.plan.descripcionCobertura).subscribe((data) => {

        if(parseInt(data) == 1){
          this.mostrarSpinner = false;

          this.cambioStep.emit(3);
        }else{

        }

      });
    
  }

}
