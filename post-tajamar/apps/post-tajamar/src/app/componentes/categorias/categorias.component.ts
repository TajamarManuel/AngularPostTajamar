import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriasTrabajadores } from '@post-tajamar/models';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { MatTableDataSource } from '@angular/material/table';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';

@Component({
  selector: 'post-tajamar-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  @Input() crearBotonFixed: string = 'true'

  resultados = 0
  dataSource = null;
  columnsToDisplay = ['categoria', 'incremento', 'descripcion', 'editar'];

  categorias = new Array<CategoriasTrabajadores>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterSetter: GetterSetterService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerCategorias()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resultados = this.dataSource.filteredData.length
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerCategorias() {
    this.getterSetter.CategoriasTrabajadores.subscribe(
      categorias => {
        this.categorias = categorias
        this.formatearDatosCategoriaAntesDeMeterEnTabla()
      }
    )
  }

  formatearDatosCategoriaAntesDeMeterEnTabla() {
    this.dataSource = new MatTableDataSource(this.categorias.map(x => {
      return {
        categoria: x.categoria,
        descripcion: x.descripcion,
        incremento: x.incrementoSalarial,
        id: x.id
      }
    }))
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
    this.resultados = this.dataSource.length
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearCategoria(categoriaId?: number) {
    let data = null
    if (categoriaId !== null && categoriaId !== undefined) {
      data = { categoria: this.categorias.find(x => x.id === categoriaId) }
    }
    this.dialog.open(CrearCategoriaComponent, { data: data, disableClose: true }).afterClosed().subscribe(
      respuesta => {
        if (respuesta.enviado === true) {
          this.obtenerCategorias()
        }
      }
    )
  }

}
