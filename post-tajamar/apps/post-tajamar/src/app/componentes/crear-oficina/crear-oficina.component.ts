import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupsModule } from '@post-tajamar/form-group';
import { Oficinas } from "@post-tajamar/models";
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';

@Component({
  selector: 'post-tajamar-crear-oficina',
  templateUrl: './crear-oficina.component.html',
  styleUrls: ['./crear-oficina.component.scss']
})
export class CrearOficinaComponent implements OnInit {

  constructor(private formGroups: FormGroupsModule, private dialogRef: MatDialogRef<CrearOficinaComponent>, @Inject(MAT_DIALOG_DATA) public data: { oficina: Oficinas }, private getterSetter: GetterSetterService) { }

  oficinas = new Array<Oficinas>()

  ngOnInit(): void {
    this.obtenerOficinas()
  }

  obtenerOficinas() {
    this.getterSetter.Oficinas.subscribe(
      oficinas => {
        this.oficinas = oficinas
        if (this.data !== undefined && this.data !== null) {
          if (this.data.oficina !== undefined && this.data.oficina !== null) {
            this.oficina.setValue(this.data.oficina.oficina)
            this.descripcion.setValue(this.data.oficina.descripcion)
            this.direccion.setValue(this.data.oficina.direccion)
          } else {
            this.crearOficinaFormulario.reset()
          }
        } else {
          this.crearOficinaFormulario.reset()
        }
      }
    )
  }

  crearOficina() {
    const oficina: Oficinas = {
      oficina: this.oficina_value,
      descripcion: this.descripcion_value,
      direccion: this.direccion_value
    }
    if (this.data !== null && this.data !== undefined) {
      if (this.data.oficina !== null && this.data.oficina !== undefined) {
        oficina.id = this.data.oficina.id
      }
    }
    this.getterSetter.setOficinas(oficina)
    this.dialogRef.close({ enviado: true })
  }

  cerrarDialog() {
    this.dialogRef.close({ enviado: false })
  }

  validarFormulario() {
    if (this.crearOficinaFormulario.valid) {
      if (this.data !== null && this.data !== undefined) {
        if (this.data.oficina !== null && this.data.oficina !== undefined) {
          const oficina: Oficinas = {
            oficina: this.oficina_value,
            descripcion: this.descripcion_value,
            direccion: this.direccion_value,
            id: this.data.oficina.id
          }
          if (
            this.data.oficina.oficina !== oficina.oficina ||
            this.data.oficina.descripcion !== oficina.descripcion ||
            this.data.oficina.direccion !== oficina.direccion ||
            this.data.oficina.id !== oficina.id
          ) {
            return false
          } else {
            return true
          }
        }
      } else {
        return false
      }
    } else {
      return true
    }
  }

  get oficina() { return this.crearOficinaFormulario.get('oficina') }
  get oficina_value() { return this.crearOficinaFormulario.value.oficina }
  get direccion() { return this.crearOficinaFormulario.get('direccion') }
  get direccion_value() { return this.crearOficinaFormulario.value.direccion }
  get descripcion() { return this.crearOficinaFormulario.get('descripcion') }
  get descripcion_value() { return this.crearOficinaFormulario.value.descripcion }

  get crearOficinaFormulario() { return this.formGroups.creacionOficina }

}
