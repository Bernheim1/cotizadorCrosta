import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceApiService } from '../service-api.service';

@Component({
  selector: 'app-form-final',
  templateUrl: './form-final.component.html',
  styleUrls: ['./form-final.component.css']
})
export class FormFinalComponent implements OnInit {

  @Output() cambioStep = new EventEmitter();

  constructor(public serviceApi : ServiceApiService) { }

  ngOnInit(): void {
  }

}
