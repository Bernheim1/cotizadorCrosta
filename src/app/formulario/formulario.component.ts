import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, map, startWith } from 'rxjs'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { InfoautoService } from '../service/infoauto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  faCircleExclamation = faCircleExclamation;
  public form !: FormGroup
  @Output() cambioStep = new EventEmitter();
  public data : any;
  public marcaSeleccionada : string = "";
  public marcas : any[] = [];
  public marca = new FormControl('', Validators.required);
  public anio = new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2024)]);
  public modelo = new FormControl('', Validators.required);
  public marcasFiltradas: Observable<any[]> | undefined;
  public modelosFiltrados: Observable<any[]> | undefined;
  public mostrarSpinner : boolean = false;

  constructor(private fb : FormBuilder, public apiService : ApiService, public dataService : DataService, public infoAutoService : InfoautoService) { 
    
    this.buscarInfoAuto();
    
    this.form = this.fb.group({
      'marca' : this.marca,
      'anio' : this.anio,
      'modelo' : this.modelo,
    });
  }

  get formValido() : boolean {
    return this.marca.value.id != undefined && this.anio.value != "" && this.modelo.value.codia != undefined
  }

  ngOnInit(): void {

    this.marca.valueChanges.subscribe((data) => {

      if(data.id != undefined){

        let marca = this.infoAutoService.marcas.find(x => x.name.toLocaleLowerCase().includes(data.name.toLocaleLowerCase()));

        this.apiService.getModelos(marca.id, this.anio.value).subscribe((data) => {
          
          this.infoAutoService.modelos = [];
  
          data.forEach(x => {
            let a = {'codia': x.codia, 'description' : x.description};
            this.infoAutoService.modelos.push(a);
          });

          this.infoAutoService.modelos = [];
          this._filterModelos("");
          this.modelo.setValue("");
          this.anio.setValue("");
  
        });
      }

    });

    this.anio.valueChanges.subscribe((dataAnio) => {
        if(this.marca.value.name != undefined && dataAnio.toString().length >= 4){

          let marca = this.infoAutoService.marcas.find(x => x.name.toLocaleLowerCase().includes(this.marca.value.name.toLocaleLowerCase()));
  
          this.apiService.getModelos(marca.id, dataAnio).subscribe((data) => {
            
            this.infoAutoService.modelos = [];
    
            data.forEach(x => {
              let a = {'codia': x.codia, 'description' : x.description};
              this.infoAutoService.modelos.push(a);
            });
    
          });
        }
    });

    this.marcasFiltradas = this.marca.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterMarcas(name as string) : this.infoAutoService.marcas.slice();
      })
    );

    this.modelosFiltrados = this.modelo.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterModelos(name as string) : this.infoAutoService.modelos.slice();
      })
    );
  }

  get f () {
    return this.form.controls;
  }

  formCompleto(item : any){

    this.dataService.datosAuto = this.form.getRawValue();

    this.mostrarSpinner = true;

    this.apiService.getCotizacionFull().subscribe((data) => {

      let parser = new DOMParser();
      let xml = parser.parseFromString(data,"text/xml");

      let listaCotizacionFull = xml.getElementsByTagName('cot1:CotizacionFull');

      let arr = [];

      for(let i = 0; i < listaCotizacionFull.length; i++){

        let codigoCobertura : any = "";
        let descripcionCobertura : any = "";
        let premioCobertura : any = "";
        let sumaAsegurada : any = "";

        let cobertura = xml.getElementsByTagName('cot1:CotizacionFull')[i].childNodes;

        for(let j = 0; j < cobertura.length; j++){
          if(cobertura[j].nodeName == "cot1:codigoDeCobertura"){
            codigoCobertura = cobertura[j].firstChild?.nodeValue?.toString();
          }
          if(cobertura[j].nodeName == "cot1:descripcionDeCobertura"){
            descripcionCobertura = cobertura[j].firstChild?.nodeValue?.toString();
          }
          if(cobertura[j].nodeName == "cot1:premio"){
            premioCobertura = cobertura[j].firstChild?.firstChild?.nodeValue?.toString();
            premioCobertura = (parseInt(premioCobertura) / 12).toString();
          }
          if(cobertura[j].nodeName == "cot1:sumaAsegurada"){
            sumaAsegurada = cobertura[j].firstChild?.nodeValue?.toString();
          }
        }

        let aux = {
          'codigoCobertura' : codigoCobertura,
          'descripcionCobertura' : descripcionCobertura,
          'premio': premioCobertura,
          'sumaAsegurada': sumaAsegurada
        }

        arr.push(aux);

      }
      this.dataService.datosCotizacion = arr;

      this.mostrarSpinner = false;

      this.cambioStep.emit(item);
    });

  }

  buscarInfoAuto(){

    this.apiService.getInfoAutoToken().subscribe((data) => {
      this.infoAutoService.token = data.access_token;

      this.apiService.getMarcas().subscribe((data) => {
        
        data.forEach(x => {
          let a = {'id': x.id, 'name' : x.name};
          this.infoAutoService.marcas.push(a);
        });

      });
    });
  }

  displayMarca(item : any) : string{
    return item.name;
  }

  displayModelo(item : any) : string{
    return item.description;
  }
  
  private _filterMarcas(name : string): any{
    const filterValue = name.toLocaleLowerCase();

    return this.infoAutoService.marcas.filter(x => x.name.toLocaleLowerCase().includes(filterValue));
  }

  private _filterModelos(name : string): any{
    const filterValue = name.toLocaleLowerCase();

    return this.infoAutoService.modelos.filter(x => x.description.toLocaleLowerCase().includes(filterValue));
  }

  
}
