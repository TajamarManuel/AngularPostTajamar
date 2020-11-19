import { Injectable } from '@angular/core';
import { Personas } from '@post-tajamar/models';
import { ToastrService } from 'ngx-toastr';
import { EncriptacionService } from '../encriptacion/encriptacion.service';
import { GetterSetterService } from '../getterSetter/getter-setter.service';
import { TrabajadorService } from "../trabajador/trabajador.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  personaLogged: Personas = null

  constructor(private encriptado: EncriptacionService, private getterSetter: GetterSetterService, private toastr: ToastrService, private trabajadorService: TrabajadorService) { }

  login(email: string, contrasena: string, keepSesion: boolean) {
    this.getterSetter.Personas.subscribe(
      personas => {
        const personaEncontrada = personas.find(x => x.email === email)
        if (personaEncontrada !== undefined && personaEncontrada !== null) {
          if (personaEncontrada.contrasena === this.encriptado.encriptar(contrasena)) {
            this.personaLogged = personaEncontrada
            if (keepSesion === true) {
              localStorage.setItem("persona", JSON.stringify(personaEncontrada))
            }
            this.toastr.success("Ha entrado en su cuenta")
            this.trabajadorService.datosTrabajador(personaEncontrada.id)
          } else {
            this.toastr.warning("La contraseña no coincide")
          }
        } else {
          this.toastr.warning("El email no se encuentra en nuestra BBDD")
        }
      },
      err => {
        console.log(err)
        this.logout(false)
      }
    )
  }

  logout(mostrarMensaje: boolean = true) {
    this.personaLogged = null
    localStorage.removeItem("persona")
    localStorage.removeItem("trabajador")
    if (mostrarMensaje === true) {
      this.toastr.success("Sesión cerrada")
    }
  }

  register(persona: Personas, keepSesion: boolean) {
    const contrasena = persona.contrasena
    persona.contrasena = this.encriptado.encriptar(persona.contrasena)
    this.getterSetter.Personas.subscribe(
      personas => {
        if (personas.map(x => x.email).includes(persona.email)) {
          this.toastr.warning("Ya existe una cuenta con este correo")
        } else if (personas.map(x => x.dni).includes(persona.dni)) {
          this.toastr.warning("Ya existe una cuenta con este dni")
        } else if (personas.map(x => x.telefono).includes(persona.telefono)) {
          this.toastr.warning("Ya existe una cuenta con este telefono")
        } else {
          this.getterSetter.setPersonas(persona)
          this.login(persona.email, contrasena, keepSesion)
        }
      },
      err => {
        console.log(err)
        this.logout(false)
      }
    )
  }

  get isLogged(): boolean {
    const persona = localStorage.getItem("persona")
    if (this.personaLogged !== null && this.personaLogged !== undefined) {
      localStorage.setItem("persona", JSON.stringify(this.personaLogged))
    } else if (persona !== null && persona !== undefined) {
      this.personaLogged = JSON.parse(persona)
    }
    return this.personaLogged !== null && this.personaLogged !== undefined
  }

  get isTrabajador(): boolean {
    return this.trabajadorService.esTrabajador
  }
}
