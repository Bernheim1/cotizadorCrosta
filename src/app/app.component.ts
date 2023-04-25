import { Component, Input } from '@angular/core';
import { faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cotizadorCrosta';
  faSquarePhone = faSquarePhone;

  public step : any = 0;

  constructor(public dataService : DataService){
  }

  eventoStep(evento : any){
    this.step = evento;

  }

}
