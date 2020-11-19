import { Injectable } from '@angular/core';
import { SqlDelete, SqlInsert, SqlUpdate } from '@post-tajamar/interfaces-sql';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { DatosService } from '../datos/datos.service';
import { CategoriasTrabajadores, Oficinas, EstadosPersona, Personas, Trabajadores, HistoricosCategorias, Administracion } from "@post-tajamar/models";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class GetterSetterService {

  constructor(private datos: DatosService, private api: ApiService, private http: HttpClient, private toastr: ToastrService) { }

  public get CategoriasTrabajadores(): Observable<CategoriasTrabajadores[]> {
    if (this.datos.CategoriasTrabajadores.length !== 0 && !this.datos.reiniciarCategoriasTrabajadores && this.datos.CategoriasTrabajadoresValores.valor !== 0) {
      this.datos.CategoriasTrabajadoresValores.valor = this.datos.CategoriasTrabajadoresValores.valor - 1
      return of(this.datos.CategoriasTrabajadores)
    } else {
      if (this.datos.reiniciarCategoriasTrabajadores === true) {
        this.datos.reiniciarCategoriasTrabajadores = false
      }
      const peticion = this.http.get<CategoriasTrabajadores[]>(`${this.api.API_URI}all/CategoriasTrabajadores`)
      peticion.subscribe(
        res => {
          this.datos.CategoriasTrabajadores = new Array<CategoriasTrabajadores>()
          this.datos.CategoriasTrabajadores = res as CategoriasTrabajadores[]
        },
        err => {
          this.toastr.error("Error en CategoriasTrabajadores")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setCategoriasTrabajadores(categoriasTrabajadores: CategoriasTrabajadores) {
    this.realizarOperacion("CategoriasTrabajadores", categoriasTrabajadores).subscribe(
      () => {
        if (categoriasTrabajadores.id !== null) {
          const i = this.datos.CategoriasTrabajadores.indexOf(categoriasTrabajadores)
          this.datos.CategoriasTrabajadores[i] = categoriasTrabajadores
        } else {
          this.http.get<CategoriasTrabajadores[]>(`${this.api.API_URI}all/CategoriasTrabajadores`).subscribe(
            res => {
              this.datos.CategoriasTrabajadores = new Array<CategoriasTrabajadores>()
              this.datos.CategoriasTrabajadores = res as CategoriasTrabajadores[]
            },
            err => {
              this.toastr.error("Error en CategoriasTrabajadores")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en CategoriasTrabajadores")
        console.log(err)
      }
    )
  }

  public deleteCategoriasTrabajadores(categoriasTrabajadores: CategoriasTrabajadores) {
    this.realizarOperacion("CategoriasTrabajadores", categoriasTrabajadores, true).subscribe(
      () => {
        const i = this.datos.CategoriasTrabajadores.indexOf(categoriasTrabajadores)
        this.datos.CategoriasTrabajadores.splice(i, i)
      }
    )
  }

  public get Oficinas(): Observable<Oficinas[]> {
    if (this.datos.Oficinas.length !== 0 && !this.datos.reiniciarOficinas && this.datos.OficinasValores.valor !== 0) {
      this.datos.OficinasValores.valor = this.datos.OficinasValores.valor - 1
      return of(this.datos.Oficinas)
    } else {
      if (this.datos.reiniciarOficinas === true) {
        this.datos.reiniciarOficinas = false
      }
      const peticion = this.http.get<Oficinas[]>(`${this.api.API_URI}all/Oficinas`)
      peticion.subscribe(
        res => {
          this.datos.Oficinas = new Array<Oficinas>()
          this.datos.Oficinas = res as Oficinas[]
        },
        err => {
          this.toastr.error("Error en Oficinas")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setOficinas(oficinas: Oficinas) {
    this.realizarOperacion("Oficinas", oficinas).subscribe(
      () => {
        if (oficinas.id !== null) {
          const i = this.datos.Oficinas.indexOf(oficinas)
          this.datos.Oficinas[i] = oficinas
        } else {
          this.http.get<Oficinas[]>(`${this.api.API_URI}all/Oficinas`).subscribe(
            res => {
              this.datos.Oficinas = new Array<Oficinas>()
              this.datos.Oficinas = res as Oficinas[]
            },
            err => {
              this.toastr.error("Error en Oficinas")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en Oficinas")
        console.log(err)
      }
    )
  }

  public deleteOficinas(oficinas: Oficinas) {
    this.realizarOperacion("Oficinas", oficinas, true).subscribe(
      () => {
        const i = this.datos.Oficinas.indexOf(oficinas)
        this.datos.Oficinas.splice(i, i)
      }
    )
  }

  public get EstadosPersona(): Observable<EstadosPersona[]> {
    if (this.datos.EstadosPersona.length !== 0 && !this.datos.reiniciarEstadosPersona && this.datos.EstadosPersonaValores.valor !== 0) {
      this.datos.EstadosPersonaValores.valor = this.datos.EstadosPersonaValores.valor - 1
      return of(this.datos.EstadosPersona)
    } else {
      if (this.datos.reiniciarEstadosPersona === true) {
        this.datos.reiniciarEstadosPersona = false
      }
      const peticion = this.http.get<EstadosPersona[]>(`${this.api.API_URI}all/EstadosPersona`)
      peticion.subscribe(
        res => {
          this.datos.EstadosPersona = new Array<EstadosPersona>()
          this.datos.EstadosPersona = res as EstadosPersona[]
        },
        err => {
          this.toastr.error("Error en EstadosPersona")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setEstadosPersona(estadosPersona: EstadosPersona) {
    this.realizarOperacion("EstadosPersona", estadosPersona).subscribe(
      () => {
        if (estadosPersona.id !== null) {
          const i = this.datos.EstadosPersona.indexOf(estadosPersona)
          this.datos.EstadosPersona[i] = estadosPersona
        } else {
          this.http.get<EstadosPersona[]>(`${this.api.API_URI}all/EstadosPersona`).subscribe(
            res => {
              this.datos.EstadosPersona = new Array<EstadosPersona>()
              this.datos.EstadosPersona = res as EstadosPersona[]
            },
            err => {
              this.toastr.error("Error en EstadosPersona")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en EstadosPersona")
        console.log(err)
      }
    )
  }

  public deleteEstadosPersona(estadosPersona: EstadosPersona) {
    this.realizarOperacion("EstadosPersona", estadosPersona, true).subscribe(
      () => {
        const i = this.datos.EstadosPersona.indexOf(estadosPersona)
        this.datos.EstadosPersona.splice(i, i)
      }
    )
  }

  public get Personas(): Observable<Personas[]> {
    if (this.datos.Personas.length !== 0 && !this.datos.reiniciarPersonas && this.datos.PersonasValores.valor !== 0) {
      this.datos.PersonasValores.valor = this.datos.PersonasValores.valor - 1
      return of(this.datos.Personas)
    } else {
      if (this.datos.reiniciarPersonas === true) {
        this.datos.reiniciarPersonas = false
      }
      const peticion = this.http.get<Personas[]>(`${this.api.API_URI}all/Personas`)
      peticion.subscribe(
        res => {
          this.datos.Personas = new Array<Personas>()
          this.datos.Personas = res as Personas[]
        },
        err => {
          this.toastr.error("Error en Personas")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setPersonas(personas: Personas) {
    this.realizarOperacion("Personas", personas).subscribe(
      () => {
        if (personas.id !== null) {
          const i = this.datos.Personas.indexOf(personas)
          this.datos.Personas[i] = personas
        } else {
          this.http.get<Personas[]>(`${this.api.API_URI}all/Personas`).subscribe(
            res => {
              this.datos.Personas = new Array<Personas>()
              this.datos.Personas = res as Personas[]
            },
            err => {
              this.toastr.error("Error en Personas")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en Personas")
        console.log(err)
      }
    )
  }

  public deletePersonas(personas: Personas) {
    this.realizarOperacion("Personas", personas, true).subscribe(
      () => {
        const i = this.datos.Personas.indexOf(personas)
        this.datos.Personas.splice(i, i)
      }
    )
  }

  public get Trabajadores(): Observable<Trabajadores[]> {
    if (this.datos.Trabajadores.length !== 0 && !this.datos.reiniciarTrabajadores && this.datos.TrabajadoresValores.valor !== 0) {
      this.datos.TrabajadoresValores.valor = this.datos.TrabajadoresValores.valor - 1
      return of(this.datos.Trabajadores)
    } else {
      if (this.datos.reiniciarTrabajadores === true) {
        this.datos.reiniciarTrabajadores = false
      }
      const peticion = this.http.get<Trabajadores[]>(`${this.api.API_URI}all/Trabajadores`)
      peticion.subscribe(
        res => {
          this.datos.Trabajadores = new Array<Trabajadores>()
          this.datos.Trabajadores = res as Trabajadores[]
        },
        err => {
          this.toastr.error("Error en Trabajadores")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setTrabajadores(trabajadores: Trabajadores) {
    this.realizarOperacion("Trabajadores", trabajadores).subscribe(
      () => {
        if (trabajadores.id !== null) {
          const i = this.datos.Trabajadores.indexOf(trabajadores)
          this.datos.Trabajadores[i] = trabajadores
        } else {
          this.http.get<Trabajadores[]>(`${this.api.API_URI}all/Trabajadores`).subscribe(
            res => {
              this.datos.Trabajadores = new Array<Trabajadores>()
              this.datos.Trabajadores = res as Trabajadores[]
            },
            err => {
              this.toastr.error("Error en Trabajadores")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en Trabajadores")
        console.log(err)
      }
    )
  }

  public deleteTrabajadores(trabajadores: Trabajadores) {
    this.realizarOperacion("Trabajadores", trabajadores, true).subscribe(
      () => {
        const i = this.datos.Trabajadores.indexOf(trabajadores)
        this.datos.Trabajadores.splice(i, i)
      }
    )
  }

  public get HistoricosCategorias(): Observable<HistoricosCategorias[]> {
    if (this.datos.HistoricosCategorias.length !== 0 && !this.datos.reiniciarHistoricosCategorias && this.datos.HistoricosCategoriasValores.valor !== 0) {
      this.datos.HistoricosCategoriasValores.valor = this.datos.HistoricosCategoriasValores.valor - 1
      return of(this.datos.HistoricosCategorias)
    } else {
      if (this.datos.reiniciarHistoricosCategorias === true) {
        this.datos.reiniciarHistoricosCategorias = false
      }
      const peticion = this.http.get<HistoricosCategorias[]>(`${this.api.API_URI}all/HistoricosCategorias`)
      peticion.subscribe(
        res => {
          this.datos.HistoricosCategorias = new Array<HistoricosCategorias>()
          this.datos.HistoricosCategorias = res as HistoricosCategorias[]
        },
        err => {
          this.toastr.error("Error en HistoricosCategorias")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setHistoricosCategorias(historicosCategorias: HistoricosCategorias) {
    this.realizarOperacion("HistoricosCategorias", historicosCategorias).subscribe(
      () => {
        if (historicosCategorias.id !== null) {
          const i = this.datos.HistoricosCategorias.indexOf(historicosCategorias)
          this.datos.HistoricosCategorias[i] = historicosCategorias
        } else {
          this.http.get<HistoricosCategorias[]>(`${this.api.API_URI}all/HistoricosCategorias`).subscribe(
            res => {
              this.datos.HistoricosCategorias = new Array<HistoricosCategorias>()
              this.datos.HistoricosCategorias = res as HistoricosCategorias[]
            },
            err => {
              this.toastr.error("Error en HistoricosCategorias")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en HistoricosCategorias")
        console.log(err)
      }
    )
  }

  public deleteHistoricosCategorias(historicosCategorias: HistoricosCategorias) {
    this.realizarOperacion("HistoricosCategorias", historicosCategorias, true).subscribe(
      () => {
        const i = this.datos.HistoricosCategorias.indexOf(historicosCategorias)
        this.datos.HistoricosCategorias.splice(i, i)
      }
    )
  }

  public get Administracion(): Observable<Administracion[]> {
    if (this.datos.Administracion.length !== 0 && !this.datos.reiniciarAdministracion && this.datos.AdministracionValores.valor !== 0) {
      this.datos.AdministracionValores.valor = this.datos.AdministracionValores.valor - 1
      return of(this.datos.Administracion)
    } else {
      if (this.datos.reiniciarAdministracion === true) {
        this.datos.reiniciarAdministracion = false
      }
      const peticion = this.http.get<Administracion[]>(`${this.api.API_URI}all/Administracion`)
      peticion.subscribe(
        res => {
          this.datos.Administracion = new Array<Administracion>()
          this.datos.Administracion = res as Administracion[]
        },
        err => {
          this.toastr.error("Error en Administracion")
          console.log(err)
        }
      )
      return peticion
    }
  }

  public setAdministracion(administracion: Administracion) {
    this.realizarOperacion("Administracion", administracion).subscribe(
      () => {
        if (administracion.id !== null) {
          const i = this.datos.Administracion.indexOf(administracion)
          this.datos.Administracion[i] = administracion
        } else {
          this.http.get<Administracion[]>(`${this.api.API_URI}all/Administracion`).subscribe(
            res => {
              this.datos.Administracion = new Array<Administracion>()
              this.datos.Administracion = res as Administracion[]
            },
            err => {
              this.toastr.error("Error en Administracion")
              console.log(err)
            }
          )
        }
      },
      err => {
        this.toastr.error("Error en Administracion")
        console.log(err)
      }
    )
  }

  public deleteAdministracion(administracion: Administracion) {
    this.realizarOperacion("Administracion", administracion, true).subscribe(
      () => {
        const i = this.datos.Administracion.indexOf(administracion)
        this.datos.Administracion.splice(i, i)
      }
    )
  }

  private realizarOperacion(tabla: string, elemento: any, borrar?: boolean) {
    const trabajador: Trabajadores = JSON.parse(localStorage.getItem("trabajador"))
    if (borrar) {
      if (tabla.toLocaleLowerCase() !== "administracion".toLocaleLowerCase() && tabla.toLocaleLowerCase() !== "historicoscategorias".toLocaleLowerCase()) {
        this.administracion(tabla, elemento, "BORRAR", trabajador !== null && trabajador !== undefined ? trabajador.id : null)
      }
      return this.api.delete(this.formarDelete(tabla, elemento))
    } else {
      if (elemento.id !== null && elemento.id !== undefined) {
        if (tabla.toLocaleLowerCase() !== "administracion".toLocaleLowerCase() && tabla.toLocaleLowerCase() !== "historicoscategorias".toLocaleLowerCase()) {
          const select = "SELECT * from " + tabla + " where id = " + elemento.id + " limit 1"
          this.api.get(select).subscribe(
            res => {
              this.administracion(tabla, elemento, "ACTUALIZAR", trabajador !== null && trabajador !== undefined ? trabajador.id : null, res)
            }
          )
          return this.api.put(this.formarUpdate(tabla, elemento))
        } else {
          return this.api.put(this.formarUpdate(tabla, elemento))
        }
      } else {
        if (tabla.toLocaleLowerCase() !== "administracion".toLocaleLowerCase() && tabla.toLocaleLowerCase() !== "historicoscategorias".toLocaleLowerCase()) {
          this.administracion(tabla, elemento, "CREAR", trabajador !== null && trabajador !== undefined ? trabajador.id : null)
        }
        return this.api.post(this.formarInsert(tabla, elemento))
      }
    }
  }

  private administracion(tabla: string, elemento: any, accion: "CREAR" | "ACTUALIZAR" | "BORRAR", trabajador: number, antiguoElemento?: any) {
    let accionAInsertar = null
    if (accion === "ACTUALIZAR") {
      let diferencias = new Array<{ campo: string, antiguoValor: string, nuevoValor: string }>()
      Object.keys(elemento).forEach(x => {
        if (elemento[x] !== antiguoElemento[x]) {
          if (antiguoElemento[x] !== elemento[x]) {
            diferencias.push({ campo: x, antiguoValor: antiguoElemento[x], nuevoValor: elemento[x] })
          }
        }
      })
      accionAInsertar = diferencias
    }
    if (accion === "BORRAR") {
      let borrar: { antiguosCampos: String[], antiguosValores: String[] }
      const antiguosCampos = Object.keys(elemento)
      const antiguosValores = antiguosCampos.map(x => { return elemento[x] })

      borrar = {
        antiguosCampos: antiguosCampos,
        antiguosValores: antiguosValores
      }
      accionAInsertar = borrar
    }
    if (accion === "CREAR") {
      let crear: { nuevosCampos: String[], nuevosValores: String[] }
      const nuevosCampos = Object.keys(elemento)
      const nuevosValores = nuevosCampos.map(x => { return elemento[x] })

      crear = {
        nuevosCampos: nuevosCampos,
        nuevosValores: nuevosValores
      }
      accionAInsertar = crear
    }
    const administracion: Administracion = {
      accion: accion + " ---> " + tabla + "--->" + JSON.stringify(accionAInsertar),
      fecha: new Date(),
      trabajadorId: trabajador
    }
    this.setAdministracion(administracion)
  }

  private formarInsert(tabla: string, elemento: any) {
    const claves = Object.keys(elemento)
    if (elemento.id !== undefined && elemento.id !== null && elemento.id !== "") {
      claves.splice(claves.indexOf("id"))
    }
    const respuesta: SqlInsert = {
      tabla: tabla,
      valores: this.formarCampoValor(elemento)
    }
    return respuesta
  }

  private formarUpdate(tabla: string, elemento: any) {
    const respuesta: SqlUpdate = {
      tabla: tabla,
      valores: this.formarCampoValor(elemento),
      where: [{ campo: "id", logico: "=", valor: elemento.id }]
    }
    return respuesta
  }

  private formarDelete(tabla: string, elemento: any) {
    const respuesta: SqlDelete = {
      tabla: tabla,
      where: [{ campo: "id", logico: "=", valor: elemento.id }]
    }
    return respuesta
  }

  private formarCampoValor(elemento: any) {
    return Object.keys(elemento).filter(x => elemento[x] !== null && elemento[x] !== undefined).map(x => {
      return {
        campo: String(x),
        valor: elemento[x]
      }
    })
  }

}
