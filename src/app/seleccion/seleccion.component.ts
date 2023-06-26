import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  planSeleccionado : any;
  public coberturas : any[] = [];
  public coberturasPreferencia : any[] = ['72','91','93'];
  @Output() cambioStep = new EventEmitter();


  constructor(public apiService : ApiService, public dataService : DataService) { 
    this.planSeleccionado = null;

  }

  ngOnInit(): void {
    this.coberturas = this.dataService.datosCotizacion.filter((x) => this.coberturasPreferencia.includes(x.codigoCobertura));

    if(this.coberturas.length < 3){

      let coberturasAux = this.dataService.datosCotizacion;
      
      for(let i = 0; i <= 4 - this.coberturas.length; i++){

        var max = coberturasAux.reduce((a,b)=>a.codigoCobertura>b.codigoCobertura?a:b);
        coberturasAux = coberturasAux.filter((x) => x.codigoCobertura != max.codigoCobertura);
        this.coberturas.push(max);

      }

    }

  }


  seleccionPlan(opcion : any){
    this.planSeleccionado = opcion;
  }

  selecCompleto(item : any){
    this.dataService.datosAuto.plan = this.planSeleccionado;
    this.cambioStep.emit(item);
  }


}
