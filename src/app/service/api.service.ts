import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getInfoAuto(){
  }

  getCotizacionFull(){
    this.http.get('');
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
