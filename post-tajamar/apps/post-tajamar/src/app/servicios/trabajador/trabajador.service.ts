import { Injectable } from '@angular/core';
import { CategoriasTrabajadores, Trabajadores, Oficinas } from '@post-tajamar/models';
import { ToastrService } from 'ngx-toastr';
import { GetterSetterService } from '../getterSetter/getter-setter.service';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  trabajador: Trabajadores
  oficina: Oficinas
  categoria: CategoriasTrabajadores
  constructor(private getterSetter: GetterSetterService, private toastr: ToastrService) { }

  datosTrabajador(id: number) {
    this.getterSetter.Trabajadores.subscribe(
      trabajadores => {
        this.trabajador = trabajadores.find(x => x.personaId === id)
        if (this.esTrabajador) {
          
          this.toastr.info("Bienvenido a la empresa de nuevo")
          localStorage.setItem("trabajador", JSON.stringify(this.trabajador))

          this.getterSetter.CategoriasTrabajadores.subscribe(
            categorias => {
              this.categoria = categorias.find(x => x.id === this.trabajador.categoriaTrabajadorId)
            },
            err => {
              this.toastr.error("Error en categorias")
              console.log(err)
            }
          )

          this.getterSetter.Oficinas.subscribe(
            oficinas => {
              this.oficina = oficinas.find(x => x.id === this.trabajador.oficinaId)
            },
            err => {
              this.toastr.error("Error en oficinas")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en trabajadores")
        console.log(err)
      }
    )
  }

  logoutTrabajador() {
        localStorage.removeItem("trabajador")
  }

  get esTrabajador() { return this.trabajador !== null && this.trabajador !== undefined }
}
