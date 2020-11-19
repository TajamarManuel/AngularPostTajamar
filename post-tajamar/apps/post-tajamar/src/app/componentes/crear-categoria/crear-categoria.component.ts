import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupsModule } from '@post-tajamar/form-group';
import { CategoriasTrabajadores } from "@post-tajamar/models";
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
@Component({
  selector: 'post-tajamar-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit {

  constructor(private formGroups: FormGroupsModule, private dialogRef: MatDialogRef<CrearCategoriaComponent>, @Inject(MAT_DIALOG_DATA) public data: { categoria: CategoriasTrabajadores }, private getterSetter: GetterSetterService) { }

  categorias = new Array<CategoriasTrabajadores>()

  ngOnInit(): void {
    this.obtenerCategorias()
  }

  obtenerCategorias() {
    this.getterSetter.CategoriasTrabajadores.subscribe(
      categorias => {
        this.categorias = categorias
        if (this.data !== undefined && this.data !== null) {
          if (this.data.categoria !== undefined && this.data.categoria !== null) {
            this.categoria.setValue(this.data.categoria.categoria)
            this.incrementoSalarial.setValue(this.data.categoria.incrementoSalarial)
            this.descripcion.setValue(this.data.categoria.descripcion)
          } else {
            this.crearCategoriaFormulario.reset()
          }
        } else {
          this.crearCategoriaFormulario.reset()
        }
      }
    )
  }

  crearCategoria() {
    const categoria: CategoriasTrabajadores = {
      categoria: this.categoria_value,
      descripcion: this.descripcion_value,
      incrementoSalarial: this.incrementoSalarial_value
    }
    if (this.data !== null && this.data !== undefined) {
      if (this.data.categoria !== null && this.data.categoria !== undefined) {
        categoria.id = this.data.categoria.id
      }
    }
    this.getterSetter.setCategoriasTrabajadores(categoria)
    this.dialogRef.close({ enviado: true })
  }

  cerrarDialog() {
    this.dialogRef.close({ enviado: false })
  }

  validarFormulario() {
    if (this.crearCategoriaFormulario.valid) {
      if (this.data !== null && this.data !== undefined) {
        if (this.data.categoria !== null && this.data.categoria !== undefined) {
          const categoria: CategoriasTrabajadores = {
            categoria: this.categoria_value,
            descripcion: this.descripcion_value,
            incrementoSalarial: this.incrementoSalarial_value,
            id: this.data.categoria.id
          }
          if (
            this.data.categoria.categoria !== categoria.categoria ||
            this.data.categoria.descripcion !== categoria.descripcion ||
            this.data.categoria.incrementoSalarial !== categoria.incrementoSalarial ||
            this.data.categoria.id !== categoria.id
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

  get categoria() { return this.crearCategoriaFormulario.get('categoria') }
  get categoria_value() { return this.crearCategoriaFormulario.value.categoria }
  get incrementoSalarial() { return this.crearCategoriaFormulario.get('incrementoSalarial') }
  get incrementoSalarial_value() { return this.crearCategoriaFormulario.value.incrementoSalarial }
  get descripcion() { return this.crearCategoriaFormulario.get('descripcion') }
  get descripcion_value() { return this.crearCategoriaFormulario.value.descripcion }

  get crearCategoriaFormulario() { return this.formGroups.creacionCategoria }

}
