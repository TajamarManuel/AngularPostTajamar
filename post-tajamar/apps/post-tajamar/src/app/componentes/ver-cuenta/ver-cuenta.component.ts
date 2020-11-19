import { Component, OnInit } from '@angular/core';
import { FormGroupsModule } from '@post-tajamar/form-group';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EstadosPersona, Personas } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../servicios/login/login.service';
import { EncriptacionService } from '../../servicios/encriptacion/encriptacion.service';

@Component({
  selector: 'post-tajamar-ver-cuenta',
  templateUrl: './ver-cuenta.component.html',
  styleUrls: ['./ver-cuenta.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class VerCuentaComponent implements OnInit {
  diaHoy = new Date(new Date().setDate(new Date().getDate() - 1))
  estados = new Array<EstadosPersona>()

  filteredOptions: Observable<{ grupo: string, estado: { estado: string, estadoHtml: string, disabled: boolean }[] }[]>;

  hide: boolean = true;
  persona: Personas
  formularioHabilitado = false
  constructor(private encriptar: EncriptacionService ,private dialogRef: MatDialogRef<VerCuentaComponent>, private login: LoginService, private formGroups: FormGroupsModule, private getterSetter: GetterSetterService) { }

  ngOnInit(): void {
    this.persona = this.login.personaLogged
    this.getterSetter.EstadosPersona.subscribe(res => {
      this.estados = res as EstadosPersona[]
      this.opcionesFiltradasCargar()
      this.deshabilitarFormulario()
      this.cargarDatosEnFormulario()
    },
      err => {
        console.log(err)
      })
  }

  cargarDatosEnFormulario() {
    this.dni.setValue(this.persona.dni)
    this.nombre.setValue(this.persona.nombre)
    this.apellidos.setValue(this.persona.apellidos)
    this.direccion.setValue(this.persona.direccion)
    this.discapacidad.setValue(this.persona.discapacidad)
    this.email.setValue(this.persona.email)
    this.telefono.setValue(this.persona.telefono)
    this.numeroHijos.setValue(this.persona.numeroHijos)
    this.estadoId.setValue(this.estados.find(x => x.id === this.persona.estadoId).estado)
    this.fechaNacimiento.setValue(this.persona.fechaNacimiento)
    this.LGPD.setValue(true)
  }

  deshabilitarFormulario() {
    this.contrasena.disable()
    this.dni.disable()
    this.nombre.disable()
    this.apellidos.disable()
    this.direccion.disable()
    this.discapacidad.disable()
    this.email.disable()
    this.telefono.disable()
    this.numeroHijos.disable()
    this.estadoId.disable()
    this.fechaNacimiento.disable()
  }

  habilitarFormulario() {
    this.contrasena.enable()
    this.dni.enable()
    this.nombre.enable()
    this.apellidos.enable()
    this.direccion.enable()
    this.discapacidad.enable()
    this.email.enable()
    this.telefono.enable()
    this.numeroHijos.enable()
    this.estadoId.enable()
    this.fechaNacimiento.enable()
  }

  formularioHabilitarlo() {
    this.formularioHabilitado = !this.formularioHabilitado
    if (this.formularioHabilitado) {
      this.habilitarFormulario()
    } else {
      this.deshabilitarFormulario()
    }
  }

  opcionesFiltradasCargar() {
    this.filteredOptions = this.estadoId.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  enviar() {
    const persona: Personas = {
      id: this.persona.id,
      apellidos: this.apellidos_value,
      direccion: this.direccion_value,
      discapacidad: this.discapacidad_value,
      dni: this.dni_value,
      email: this.email_value,
      estadoId: this.estados.find(x => x.estado === this.estadoId_value).id,
      fechaNacimiento: this.fechaNacimiento_value,
      nombre: this.nombre_value,
      numeroHijos: this.numeroHijos_value,
      telefono: this.telefono_value,
      contrasena: this.contrasena_value
    }
    this.dialogRef.close({ enviado: true, persona: persona })
  }

  cancelar() {
    this.dialogRef.close({ enviado: false })
  }

  private _filter(value: string): { grupo: string, estado: { estado: string, estadoHtml: string, disabled: boolean }[] }[] {
    const filterValue = value.toLowerCase();
    if (filterValue === "") {
      return [...[{ grupo: "Todos", estado: this.estados.filter(estado => !estado.estado.toLowerCase().includes(filterValue)).map(x => { return { estado: x.estado, estadoHtml: x.estado, disabled: false } }) || [{ estado: "ninguno", estadoHtml: "ninguno", disabled: true }] }]]
    } else {
      const empiezanPor = this.estados.filter(estado => estado.estado.toLocaleLowerCase().startsWith(filterValue)).map(x => { return { estado: x.estado, estadoHtml: this.ponerNegrita(filterValue, x.estado), disabled: false } })
      const contienen = this.estados.filter(estado => !estado.estado.toLowerCase().startsWith(filterValue) && estado.estado.toLowerCase().includes(filterValue)).map(x => { return { estado: x.estado, estadoHtml: this.ponerNegrita(filterValue, x.estado), disabled: false } })
      const otros = this.estados.filter(estado => !estado.estado.toLowerCase().includes(filterValue)).map(x => { return { estado: x.estado, estadoHtml: x.estado, disabled: false } })
      const ninguno = [{ estado: "ninguno", estadoHtml: "ninguno", disabled: true }]
      let opciones = [...[{ grupo: 'Empiezan por: "' + this.primeraMayuscula(filterValue) + '"', estado: empiezanPor.length !== 0 ? empiezanPor : ninguno }], ...[{ grupo: 'Contienen: "' + this.primeraMayuscula(filterValue) + '"', estado: contienen.length !== 0 ? contienen : ninguno }]]
      if (otros.length !== 0) {
        opciones = [...opciones, ...[{ grupo: "Otros", estado: otros }]]
      }
      return opciones
    }

  }

  ponerNegrita(filtro: any, palabra: string) {
    palabra = palabra.toLocaleLowerCase()
    let comienzoPalabra = palabra.substr(0, palabra.indexOf(filtro))
    const finalPalabra = palabra.substr(palabra.indexOf(filtro) + filtro.length)

    if (comienzoPalabra !== null && comienzoPalabra !== undefined && comienzoPalabra !== "") {
      comienzoPalabra = this.primeraMayuscula(comienzoPalabra)
    } else {
      filtro = this.primeraMayuscula(filtro)
    }
    return comienzoPalabra + "<strong>" + filtro + "</strong>" + finalPalabra
  }

  primeraMayuscula(value: string) {
    const primeraLetra = value.substr(0, 1)
    const demas = value.substr(1)

    return primeraLetra.toLocaleUpperCase() + demas
  }

  opcionValida() {
    return this.estados.map(x => x.estado).includes(this.estadoId_value)
  }

  errores() {
    if (this.registerFormulario.valid) {
      if (this.encriptar.encriptar(this.contrasena_value) !== this.persona.contrasena) {
        return true
      } else {
        const persona: Personas = {
          id: this.persona.id,
          apellidos: this.apellidos_value,
          direccion: this.direccion_value,
          discapacidad: this.discapacidad_value,
          dni: this.dni_value,
          email: this.email_value,
          estadoId: this.estados.find(x => x.estado === this.estadoId_value).id,
          fechaNacimiento: this.fechaNacimiento_value,
          nombre: this.nombre_value,
          numeroHijos: this.numeroHijos_value,
          telefono: this.telefono_value,
          contrasena: this.contrasena_value
        }
        if (this.persona.id !== persona.id || this.persona.apellidos !== persona.apellidos || this.persona.direccion !== persona.direccion || this.persona.discapacidad !== persona.discapacidad || this.persona.dni !== persona.dni || this.persona.email !== persona.email || this.persona.estadoId !== persona.estadoId || this.persona.fechaNacimiento !== persona.fechaNacimiento || this.persona.nombre !== persona.nombre || this.persona.numeroHijos !== persona.numeroHijos || this.persona.telefono !== persona.telefono) {
          return false
        } else {
          return true
        }
      }
    } else {
      return true
    }
  }
  get contrasena() { return this.registerFormulario.get("contrasena") }
  get contrasena_value() { return this.registerFormulario.value.contrasena }
  get dni() { return this.registerFormulario.get("dni") }
  get dni_value() { return this.registerFormulario.value.dni }
  get nombre() { return this.registerFormulario.get("nombre") }
  get nombre_value() { return this.registerFormulario.value.nombre }
  get apellidos() { return this.registerFormulario.get("apellidos") }
  get apellidos_value() { return this.registerFormulario.value.apellidos }
  get direccion() { return this.registerFormulario.get("direccion") }
  get direccion_value() { return this.registerFormulario.value.direccion }
  get discapacidad() { return this.registerFormulario.get("discapacidad") }
  get discapacidad_value() { return this.registerFormulario.value.discapacidad }
  get email() { return this.registerFormulario.get("email") }
  get email_value() { return this.registerFormulario.value.email }
  get telefono() { return this.registerFormulario.get("telefono") }
  get telefono_value() { return this.registerFormulario.value.telefono }
  get numeroHijos() { return this.registerFormulario.get("numeroHijos") }
  get numeroHijos_value() { return this.registerFormulario.value.numeroHijos }
  get estadoId() { return this.registerFormulario.get("estadoId") }
  get estadoId_value() { return this.registerFormulario.value.estadoId }
  get fechaNacimiento() { return this.registerFormulario.get("fechaNacimiento") }
  get fechaNacimiento_value() { return this.registerFormulario.value.fechaNacimiento }
  get LGPD() { return this.registerFormulario.get("LGPD") }
  get LGPD_value() { return this.registerFormulario.value.LGPD }

  get registerFormulario() { return this.formGroups.registerForm }
}
