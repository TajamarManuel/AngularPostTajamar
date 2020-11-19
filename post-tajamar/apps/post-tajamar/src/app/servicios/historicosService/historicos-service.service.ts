import { Injectable } from '@angular/core';
import { HistoricosCategorias, Trabajadores } from '@post-tajamar/models';
import { GetterSetterService } from '../getterSetter/getter-setter.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricosService {

  constructor(private getterSetter: GetterSetterService) { }

  cambiarCategoriaTrabajador(trabajadorObtenido: Trabajadores, categoria: number) {
    const historicoCategoria: HistoricosCategorias = {
      categoriasTrabajadorId: categoria,
      fechaSalida: null,
      fechaUpgrade: new Date(),
      trabajadorId: null,
    }
    if (trabajadorObtenido.id !== undefined && trabajadorObtenido.id !== null) {
      historicoCategoria.trabajadorId = trabajadorObtenido.id
      this.cambioCategoriaActualizarAnterior(historicoCategoria)
    } else {
      this.getterSetter.Trabajadores.subscribe(
        trabajadores => {
          historicoCategoria.trabajadorId = trabajadores.find(x => x.personaId === trabajadorObtenido.personaId).id
          this.cambioCategoriaActualizarAnterior(historicoCategoria)
        }
      )
    }
  }

  private cambioCategoriaActualizarAnterior(historicoCategoriasNuevo: HistoricosCategorias) {
    this.getterSetter.HistoricosCategorias.subscribe(
      historicos => {
        const historicoAntiguo = historicos.find(x => x.trabajadorId === historicoCategoriasNuevo.trabajadorId && x.fechaSalida === null)
        if (historicoAntiguo !== undefined && historicoAntiguo !== null) {
          historicoAntiguo.fechaSalida = new Date()
          this.getterSetter.setHistoricosCategorias(historicoAntiguo)
        }
        this.getterSetter.setHistoricosCategorias(historicoCategoriasNuevo)
      }
    )
  }
}
