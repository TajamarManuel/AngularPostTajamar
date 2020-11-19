import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EstadosPersona, Personas } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { FormGroupsModule } from '@post-tajamar/form-group';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'post-tajamar-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  diaHoy = new Date(new Date().setDate(new Date().getDate() - 1))
  estados = new Array<EstadosPersona>()

  filteredOptions: Observable<{ grupo: string, estado: { estado: string, estadoHtml: string, disabled: boolean }[] }[]>;

  hide: boolean = true;

  constructor(private formGroups: FormGroupsModule, private getterSetter: GetterSetterService, private dialogRef: MatDialogRef<PersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { persona: Personas }) { }

  ngOnInit(): void {
    this.getterSetter.EstadosPersona.subscribe(res => {
      this.estados = res as EstadosPersona[]
      this.opcionesFiltradasCargar()
      this.email.setValue(this.data.persona.email)
      this.contrasena.setValue(this.data.persona.contrasena)
      this.contrasena.disable()
      this.dni.setValue(this.data.persona.dni)
      this.nombre.setValue(this.data.persona.nombre)
      this.apellidos.setValue(this.data.persona.apellidos)
      this.direccion.setValue(this.data.persona.direccion)
      this.discapacidad.setValue(this.data.persona.discapacidad)
      this.telefono.setValue(this.data.persona.telefono)
      this.numeroHijos.setValue(this.data.persona.numeroHijos)
      this.estadoId.setValue(this.estados.find(x => x.id === this.data.persona.estadoId).estado)
      this.fechaNacimiento.setValue(this.data.persona.fechaNacimiento)
      this.LGPD.setValue(true)
      this.LGPD.disable()
    },
      err => {
        console.log(err)
      })
  }



  cancelar() {
    this.dialogRef.close({ enviado: false })
  }

  enviar() {
    const persona: Personas = {
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
      contrasena: this.data.persona.contrasena,
      id: this.data.persona.id
    }
    this.getterSetter.setPersonas(persona)
    this.dialogRef.close({ enviado: true })
  }

  opcionesFiltradasCargar() {
    this.filteredOptions = this.estadoId.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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

  errores() {
    if (this.estados.length !== 0) {
      if (this.estados.find(x => x.estado === this.estadoId_value) !== null && this.estados.find(x => x.estado === this.estadoId_value) !== undefined) {
        const persona: Personas = {
          id: this.data.persona.id,
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
          contrasena: this.data.persona.contrasena
        }
        let igual = true
        if (
          this.data.persona.id !== persona.id ||
          this.data.persona.apellidos !== persona.apellidos ||
          this.data.persona.direccion !== persona.direccion ||
          this.data.persona.discapacidad !== persona.discapacidad ||
          this.data.persona.dni !== persona.dni ||
          this.data.persona.email !== persona.email ||
          this.data.persona.estadoId !== persona.estadoId ||
          this.data.persona.fechaNacimiento !== persona.fechaNacimiento ||
          this.data.persona.nombre !== persona.nombre ||
          this.data.persona.numeroHijos !== persona.numeroHijos ||
          this.data.persona.telefono !== persona.telefono ||
          this.data.persona.contrasena !== persona.contrasena
        ) {
          igual = false
        }
        return !(this.registerFormulario.valid && !igual)
      } else {
        return false
      }
    } else {
      return false
    }
  }

  opcionValida() {
    return this.estados.map(x => x.id).includes(this.estadoId_value)
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
