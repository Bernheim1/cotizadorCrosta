import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-confimacion-email',
  templateUrl: './confimacion-email.component.html',
  styleUrls: ['./confimacion-email.component.css']
})
export class ConfimacionEmailComponent implements OnInit {

  @Output() cambioStep = new EventEmitter();

  constructor(public dataService : DataService) { }

  ngOnInit(): void {
  }

  volverCotizar(){
    this.dataService.datosAuto = null;
    this.dataService.datosContacto = null;
    this.cambioStep.emit(0);
  }

}
