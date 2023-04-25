import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { FormContratarComponent } from './form-contratar/form-contratar.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ConfimacionEmailComponent } from './confimacion-email/confimacion-email.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    SeleccionComponent,
    FormContratarComponent,
    ConfimacionEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
