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

  constructor(public apiService : ApiService, public dataService : DataService) { 
    this.planSeleccionado = null;

    this.planes.push(this.plan1);
    this.planes.push(this.plan2);
    this.planes.push(this.plan3);
  }

  ngOnInit(): void {
  }


  seleccionPlan(opcion : any){
    this.planSeleccionado = opcion;
  }

  selecCompleto(item : any){
    this.dataService.datosAuto.plan = this.planSeleccionado;
    this.cambioStep.emit(item);
  }


}
