import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { FormContratarComponent } from './form-contratar/form-contratar.component';
import { FormDatosContactoComponent } from './form-datos-contacto/form-datos-contacto.component';
import { FormFinalComponent } from './form-final/form-final.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    SeleccionComponent,
    FormContratarComponent,
    FormDatosContactoComponent,
    FormFinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
