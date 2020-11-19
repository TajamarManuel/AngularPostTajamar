import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriasTrabajadores, HistoricosCategorias, Personas, Trabajadores } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';

@Component({
  selector: 'post-tajamar-historico-categorias',
  templateUrl: './historico-categorias.component.html',
  styleUrls: ['./historico-categorias.component.scss']
})
export class HistoricoCategoriasComponent implements OnInit {

  historicoCategorias = new Array<HistoricosCategorias>()
  categorias = new Array<CategoriasTrabajadores>()
  trabajadores = new Array<Trabajadores>()
  personas = new Array<Personas>()

  resultados = 0
  dataSource = null;
  columnsToDisplay = ['FechaEntrada', 'FechaSalida', 'Categoria', 'Incremento', 'Trabajador'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterSetter: GetterSetterService) { }

  ngOnInit(): void {
    this.getterSetter.HistoricosCategorias.subscribe(
      historicos => {
        this.historicoCategorias = historicos
        this.getterSetter.CategoriasTrabajadores.subscribe(
          categorias => {
            this.categorias = categorias
            this.getterSetter.Trabajadores.subscribe(
              trabajadores => {
                this.trabajadores = trabajadores
                this.getterSetter.Personas.subscribe(
                  personas => {
                    this.personas = personas

                    this.dataSource = new MatTableDataSource(this.historicoCategorias.map(x => {
                      const categoriaEncontrada = this.categorias.find(y => y.id === x.categoriasTrabajadorId)
                      const personaEncontrada = this.personas.find(y => y.id === this.trabajadores.find(z => z.id === x.trabajadorId).personaId)
                      return {
                        fechaEntrada: x.fechaUpgrade,
                        fechaSalida: x.fechaSalida,
                        categoria: categoriaEncontrada.categoria,
                        trabajador: personaEncontrada.nombre + " " + personaEncontrada.apellidos,
                        incremento: categoriaEncontrada.incrementoSalarial
                      }
                    }))
                    this.dataSource.paginator = this.paginator
                    this.resultados = this.dataSource.length
                    if (this.dataSource.paginator) {
                      this.dataSource.paginator.firstPage();
                    }
                    this.dataSource.sort = this.sort;

                  }
                )
              }
            )
          }
        )
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resultados = this.dataSource.filteredData.length
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
