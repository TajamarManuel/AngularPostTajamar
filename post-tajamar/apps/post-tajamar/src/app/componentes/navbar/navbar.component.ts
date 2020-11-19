import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from "./../../servicios/login/login.service";
import { LoginComponent } from "./../login/login.component";
import { RegisterComponent } from "./../register/register.component";
import { LogoutComponent } from "./../logout/logout.component";
import { KeepSesionComponent } from "./../keep-sesion/keep-sesion.component";
import { PersonaComponent } from '../persona/persona.component';
import { Router } from '@angular/router';
import { CrearTrabajadorComponent } from '../crear-trabajador/crear-trabajador.component';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import { CrearOficinaComponent } from '../crear-oficina/crear-oficina.component';
import { DetallesTrabajadorComponent } from '../detalles-trabajador/detalles-trabajador.component';
import { DetallesPersonaComponent } from '../detalles-persona/detalles-persona.component';
import { VerCuentaComponent } from '../ver-cuenta/ver-cuenta.component';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
@Component({
  selector: 'post-tajamar-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService, public dialog: MatDialog, private router: Router, private getterSetter: GetterSetterService) { }

  ngOnInit(): void {
  }

  login() {
    this.dialog.open(LoginComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.dialog.open(KeepSesionComponent).afterClosed().subscribe(
            res => {
              this.loginService.login(resultado.email, resultado.contrasena, res)
            }
          )
        }
      }
    )
  }

  register() {
    this.dialog.open(RegisterComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.dialog.open(KeepSesionComponent).afterClosed().subscribe(
            res => {
              this.loginService.register(resultado.persona, res)
            }
          )
        }
      }
    )
  }

  logout() {
    this.dialog.open(LogoutComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado === true) {
          this.loginService.logout()
        }
      }
    )
  }

  crearTrabajador() {
    this.dialog.open(CrearTrabajadorComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.router.navigate(['trabajadores'])
        }
      }
    )
  }

  crearCategoria() {
    this.dialog.open(CrearCategoriaComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.router.navigate(['categorias'])
        }
      }
    )
  }

  crearOficina() {
    this.dialog.open(CrearOficinaComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.router.navigate(['oficinas'])
        }
      }
    )
  }

  fichaTrabajador() {
    this.dialog.open(DetallesTrabajadorComponent, { panelClass: "custom-width" ,data: { trabajador: JSON.parse(localStorage.getItem("trabajador")) } })
  }

  verCuenta() {
    this.dialog.open(VerCuentaComponent, {panelClass: "custom-width"}).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.getterSetter.setPersonas(resultado.persona)
          localStorage.removeItem("persona")
          localStorage.setItem("persona", JSON.stringify(resultado.persona))
          this.loginService.personaLogged = resultado.persona
        }
      }
    )
  }
}

