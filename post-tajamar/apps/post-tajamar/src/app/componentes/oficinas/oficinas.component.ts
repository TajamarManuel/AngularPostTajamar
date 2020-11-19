import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Oficinas } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { CrearOficinaComponent } from '../crear-oficina/crear-oficina.component';

@Component({
  selector: 'post-tajamar-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.scss']
})
export class OficinasComponent implements OnInit {

  @Input() crearBotonFixed: string = 'true'

  resultados = 0
  dataSource = null;
  columnsToDisplay = ['oficina', 'direccion', 'descripcion', 'editar'];

  oficinas = new Array<Oficinas>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterSetter: GetterSetterService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerOficinas()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resultados = this.dataSource.filteredData.length
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerOficinas() {
    this.getterSetter.Oficinas.subscribe(
      oficinas => {
        this.oficinas = oficinas
        this.formatearDatosOficinasAntesDeMeterEnTabla()
      }
    )
  }

  formatearDatosOficinasAntesDeMeterEnTabla() {
    this.dataSource = new MatTableDataSource(this.oficinas.map(x => {
      return {
        oficina: x.oficina,
        descripcion: x.descripcion,
        direccion: x.direccion,
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

  crearOficina(oficinaId?: number) {
    let data = null
    if (oficinaId !== null && oficinaId !== undefined) {
      data = { oficina: this.oficinas.find(x => x.id === oficinaId) }
    }
    this.dialog.open(CrearOficinaComponent, { data: data, disableClose: true }).afterClosed().subscribe(
      respuesta => {
        if (respuesta.enviado === true) {
          this.obtenerOficinas()
        }
      }
    )
  }
}