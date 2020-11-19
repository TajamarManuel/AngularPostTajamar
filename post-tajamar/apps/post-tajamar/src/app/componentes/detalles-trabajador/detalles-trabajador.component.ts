import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriasTrabajadores, HistoricosCategorias, Oficinas, Personas, Trabajadores } from '@post-tajamar/models';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'post-tajamar-detalles-trabajador',
  templateUrl: './detalles-trabajador.component.html',
  styleUrls: ['./detalles-trabajador.component.scss']
})
export class DetallesTrabajadorComponent implements OnInit {

  persona: Personas
  categorias = new Array<CategoriasTrabajadores>()
  historicos = new Array<any>()
  oficina: Oficinas
  constructor(private dialogRef: MatDialogRef<DetallesTrabajadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trabajador: Trabajadores },
    private api: ApiService) { }

  ngOnInit(): void {
    this.obtenerPersonaTrabajadora()
    this.obtenerCategorias()
    this.obtenerHistoricoCategorias()
    this.obtenerOficinas()
  }

  obtenerPersonaTrabajadora() {
    this.api.getOne("personas", this.data.trabajador.personaId).subscribe(
      persona => {
        this.persona = persona[0] as Personas
      }
    )
  }

  obtenerCategorias() {
    const select = "SELECT ct.* from categoriasTrabajadores ct inner join historicosCategorias hc on ct.id = hc.categoriastrabajadorid where hc.trabajadorId = " + this.data.trabajador.id
    this.api.get(select).subscribe(
      categorias => {
        this.categorias = categorias as CategoriasTrabajadores[]
      }
    )
  }

  obtenerHistoricoCategorias() {
    const select = "SELECT * from historicosCategorias where trabajadorId = " + this.data.trabajador.id
    this.api.get(select).subscribe(
      (historicos: Array<any>) => {
        this.historicos = historicos.map(x => {
          const categoriaEncontrada = this.categorias.find(y => y.id === x.categoriasTrabajadorId)
          const y = x
          y.categoria = categoriaEncontrada.categoria
          y.incremento = categoriaEncontrada.incrementoSalarial
          return y
        })
      }
    )
  }

  obtenerOficinas() {
    const select = "SELECT * from oficinas o inner join trabajadores t on o.id = t.oficinaId where t.id = " + this.data.trabajador.id
    this.api.get(select).subscribe(
      oficina => {
        this.oficina = oficina[0] as Oficinas
      }
    )
  }

  cogerPersona() {
    return this.persona
  }

  clase(i: number) {
    if (i === 0) {
      if (this.historicos.length !== 1) {
        if (this.historicos[0].incremento > this.historicos[1].incremento) {
          return "row d-flex-justify-content-center text-success"
        } else if (this.historicos[0].incremento < this.historicos[1].incremento) {
          return "row d-flex-justify-content-center text-danger"
        } else {
          return "row d-flex-justify-content-center"
        }
      } else {
      return "row d-flex-justify-content-center"
      }
    } else if (this.historicos[i - 1].incremento < this.historicos[i].incremento) {
      return "row d-flex-justify-content-center text-success"
    } else if (this.historicos[i - 1].incremento > this.historicos[i].incremento) {
      return "row d-flex-justify-content-center text-danger"
    } else {
      return "row d-flex-justify-content-center"
    }
  }
}
