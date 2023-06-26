import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  datosAuto : any;
  datosContacto : any;
  datosCotizacion : any[] = [];

  constructor() { }
}
