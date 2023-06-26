import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { InfoautoService } from './infoauto.service';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public infoAutoService : InfoautoService, public dataService : DataService) { 

  }

  getInfoAutoToken() : Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('seguroscrosta@gmail.com:seguros.API2023')
    });

    return this.http.post<any>('https://demo.api.infoauto.com.ar/cars/auth/login','', {headers});

  }

  getMarcas() : Observable<any[]>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.infoAutoService.token,
    });

    return this.http.get<any[]>('https://demo.api.infoauto.com.ar/cars/pub/brands/',{headers});

  }

  getModelos(idMarca : any, anio : any) : Observable<any[]>{

    let auxAnio = parseInt(anio);

    if(isNaN(auxAnio) || auxAnio < 1900 || auxAnio > 2024){
      auxAnio = 2023
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.infoAutoService.token,
    });

    return this.http.get<any[]>(`https://demo.api.infoauto.com.ar/cars/pub/brands/${idMarca}/models/?prices_from=${auxAnio}&prices_to=${auxAnio}`,({headers}));
  }

  getCotizacionFull() : Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'text/xml'
    });

    let dateDesde = new Date();
    let dateHasta = new Date(dateDesde.getFullYear() + 1, dateDesde.getMonth(), dateDesde.getDate());
    let datePipe = new DatePipe('en-US');

    let fechaDesde = datePipe.transform(dateDesde,'yyyy-MM-ddT00:00:00.-03:00');
    let fechaHasta = datePipe.transform(dateHasta,'yyyy-MM-ddT00:00:00.-03:00');

    let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cot="http://xmlns.allianz.com.ar/Core/EBM/Vehiculo/CotizacionVehiculo" xmlns:ebm="http://xmlns.allianz.com.ar/CommonCore/EBM" xmlns:con="http://xmlns.allianz.com.ar/Core/EBO/Allianz/CondicionesContratacion">' +
              '   <soapenv:Header> <user>crosta</user> <pwd>HyM789hUlwcI126J</pwd> </soapenv:Header>' +
              '<soapenv:Body>' +
              '      <cot:CalcularCotizacionFullVehiculoEBM>' +
              '         <ebm:EBMHeader>' +
              '             <ebm:Sender>' +
              '               <ebm:userName>seguroscrosta@gmail.com</ebm:userName>' +
              '               <ebm:Application>Crosta</ebm:Application>' +
              '               <ebm:Country>ARG</ebm:Country>' +
              '            </ebm:Sender>' +
              '            <ebm:Target>Allianz</ebm:Target>' +
              '         </ebm:EBMHeader>' +
              '         <cot:DataArea>' +
              '            <cot:CalcularCotizacionFullVehiculo>' +
              '               <cot:codigoDeProductor>M3354</cot:codigoDeProductor>' +
              '               <cot:VehiculoACotizar>' +
              `                  <cot:codigoMarcaModelo>${this.dataService.datosAuto.modelo.codia}</cot:codigoMarcaModelo>` +
              `                  <cot:anioFabricacion>${this.dataService.datosAuto.anio}</cot:anioFabricacion>` +
              '                  <cot:valorVehiculo>0</cot:valorVehiculo>' +
              '                  <cot:codigoDeUso>1</cot:codigoDeUso>' +
              '                  <cot:es0Km>false</cot:es0Km>' +
              '                  <cot:tieneAlarma>false</cot:tieneAlarma>' +
              '                  <cot:ListaAccesorios>' +
              '                  </cot:ListaAccesorios>' +
              '               </cot:VehiculoACotizar>' +
              '               <con:CondicionesContratacion>' +
              '                  <con:tipoDePoliza>A</con:tipoDePoliza>' +
              '                  <con:medioDePago>T</con:medioDePago>' +
              '                  <con:cantidadDeCuotas>12</con:cantidadDeCuotas>' +
              '                  <con:codigoCondicionIVA>1</con:codigoCondicionIVA>' +
              '                  <con:codigoCondicionIIBB>1</con:codigoCondicionIIBB>' +
              '                  <con:tipoDocumentoTomador>D</con:tipoDocumentoTomador>' +
              '                  <con:numeroDocumentoTomador>43673004</con:numeroDocumentoTomador>' +
              `                  <con:fechaDesde>${fechaDesde}</con:fechaDesde>` +
              `                  <con:fechaHasta>${fechaHasta}</con:fechaHasta>` +
              '                  <con:fechaNacimientoAsegurado>1983-01-01T00:00:00.000-03:00</con:fechaNacimientoAsegurado>' +
              '                  <con:sexoDelAsegurado>H</con:sexoDelAsegurado>' +
              '               </con:CondicionesContratacion>' +
              '               <cot:ListaAdicionales>' +
              '               </cot:ListaAdicionales>' +
              '               <cot:UbicacionDelRiesgo>' +
              '                  <cot:codigoPostal>1878</cot:codigoPostal>' +
              '                  <cot:codigoProvincia>0</cot:codigoProvincia>' +
              '                  <cot:codigoZonaDeRiesgo/>' +
              '               </cot:UbicacionDelRiesgo>' +
              '               <cot:ListaEsquemasComerciales>' +
              '                 <cot:EsquemaComercial>' +
              '                   <cot:codigoEsquema>001</cot:codigoEsquema>' +
              '                   <cot:ListaConfiguracion>' +
              '                     <cot:Configuracion>' +
              '                       <cot:codigo>001</cot:codigo>' +
              '                       <cot:valor>020</cot:valor>' +
              '                     </cot:Configuracion>' +
              '                   </cot:ListaConfiguracion>' +
              '                 </cot:EsquemaComercial>' +
              '               </cot:ListaEsquemasComerciales>' +
              '            </cot:CalcularCotizacionFullVehiculo>' +
              '         </cot:DataArea>' +
              '      </cot:CalcularCotizacionFullVehiculoEBM>' +
              '   </soapenv:Body>' +
              '</soapenv:Envelope> ' 

    return this.http.post('https://wbs.allianzonline.com.ar:8443/Cotizadores/Vehiculo/Externo/Operaciones/OpCotizadorVehiculoExtReqABCS',xml,{headers, responseType: 'text'});
  }

  enviarEmail( e: Event){
    e.preventDefault();
    emailjs.sendForm('defaultEmail','template_pmj4jrq', e.target as HTMLFormElement, 'Ye0FIL7GWwNX4Xi6p')
    .then((result : EmailJSResponseStatus) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  }

}
