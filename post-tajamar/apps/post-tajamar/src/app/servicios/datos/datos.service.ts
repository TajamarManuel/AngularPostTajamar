import { Injectable } from '@angular/core';
import { CategoriasTrabajadores, Oficinas, EstadosPersona, Personas, Trabajadores, HistoricosCategorias, Administracion } from "@post-tajamar/models";

interface ValorDefecto {
  valor: number,
  defecto: number
}

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }

  CategoriasTrabajadores = new Array<CategoriasTrabajadores>()
  Oficinas = new Array<Oficinas>()
  EstadosPersona = new Array<EstadosPersona>()
  Personas = new Array<Personas>()
  Trabajadores = new Array<Trabajadores>()
  HistoricosCategorias = new Array<HistoricosCategorias>()
  Administracion = new Array<Administracion>()

  reiniciarCategoriasTrabajadores = false
  reiniciarOficinas = false
  reiniciarEstadosPersona = false
  reiniciarPersonas = false
  reiniciarTrabajadores = false
  reiniciarHistoricosCategorias = false
  reiniciarAdministracion = false

  CategoriasTrabajadoresValores: ValorDefecto = { valor: 0, defecto: 1 }
  OficinasValores: ValorDefecto = { valor: 0, defecto: 1 }
  EstadosPersonaValores: ValorDefecto = { valor: 0, defecto: 1 }
  PersonasValores: ValorDefecto = { valor: 0, defecto: 1 }
  TrabajadoresValores: ValorDefecto = { valor: 0, defecto: 1 }
  HistoricosCategoriasValores: ValorDefecto = { valor: 0, defecto: 1 }
  AdministracionValores: ValorDefecto = { valor: 0, defecto: 1 }
}
