import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { WelcomeComponent } from './componentes/welcome/welcome.component';
import { RoutingModule } from './modules/angular/routing/routing/routing.module';
import { MaterialModule } from "./modules/angular/material/material/material.module";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { KeepSesionComponent } from './componentes/keep-sesion/keep-sesion.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroupsModule } from '@post-tajamar/form-group';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NominasComponent } from './componentes/nominas/nominas.component';
import { TrabajadoresComponent } from './componentes/trabajadores/trabajadores.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { PersonaComponent } from './componentes/persona/persona.component';
import { CrearTrabajadorComponent } from './componentes/crear-trabajador/crear-trabajador.component';
import { CrearOficinaComponent } from './componentes/crear-oficina/crear-oficina.component';
import { CrearCategoriaComponent } from './componentes/crear-categoria/crear-categoria.component';
import { VerTodoComponent } from './componentes/ver-todo/ver-todo.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { OficinasComponent } from './componentes/oficinas/oficinas.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { DetallesPersonaComponent } from './componentes/detalles-persona/detalles-persona.component';
import { DetallesTrabajadorComponent } from './componentes/detalles-trabajador/detalles-trabajador.component';
import { VerCuentaComponent } from './componentes/ver-cuenta/ver-cuenta.component';
import { HistoricoCategoriasComponent } from './componentes/historico-categorias/historico-categorias.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RoutingModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, NavbarComponent, FooterComponent, WelcomeComponent, LoginComponent, RegisterComponent, LogoutComponent, KeepSesionComponent, NominasComponent, TrabajadoresComponent, PersonasComponent, PersonaComponent, CrearTrabajadorComponent, CrearOficinaComponent, CrearCategoriaComponent, VerTodoComponent, AdministracionComponent, OficinasComponent, CategoriasComponent, DetallesPersonaComponent, DetallesTrabajadorComponent, VerCuentaComponent, HistoricoCategoriasComponent],
  providers: [FormGroupsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }


