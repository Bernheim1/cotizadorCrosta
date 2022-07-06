import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceApiService } from '../service-api.service';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  marcaSeleccionada : any;
  planSeleccionado : any;
  planes: any[] = [];
  @Output() cambioStep = new EventEmitter();

  plan1 : any = {
    titulo : 'Responsabilidad civil',
    precio : 1388
  };

  plan2 : any = {
    titulo : 'Terceros completo',
    precio : 29872
  };

  plan3 : any = {
    titulo : 'Todo riesgo con franquicia fija',
    precio : 40321
  };

  constructor(public serviceApi : ServiceApiService) { 
    this.marcaSeleccionada = "allianz";
    this.planSeleccionado = null;

    this.planes.push(this.plan1);
    this.planes.push(this.plan2);
    this.planes.push(this.plan3);
  }

  ngOnInit(): void {
  }

  seleccionMarca(opcion : String){
    this.marcaSeleccionada = opcion;
    this.planSeleccionado = null;

    switch(opcion){
      case 'allianz' : 
    this.plan1.precio = 1540;
    this.plan2.precio = 29872;
    this.plan3.precio = 40321;
    break;
      case 'sancor' : 
      this.plan1.precio = 1388;
      this.plan2.precio = 18500;
      this.plan3.precio = 34922;
    break;
      case 'hdi' : 
      this.plan1.precio = 1200;
      this.plan2.precio = 22933;
      this.plan3.precio = 40182;
    break;
  }
  }

  seleccionPlan(opcion : any){
    this.planSeleccionado = opcion;
  }

  selecCompleto(item : any){
    this.serviceApi.datosAuto.aseguradora = this.marcaSeleccionada;
    this.serviceApi.datosAuto.plan = this.planSeleccionado;
    this.cambioStep.emit(item);
  }


}
