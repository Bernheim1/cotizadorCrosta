import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoautoService {

  token : any;
  marcas : any[] = [];
  anios : any[] = [];
  modelos : any[] = [];


  constructor() { }
}
