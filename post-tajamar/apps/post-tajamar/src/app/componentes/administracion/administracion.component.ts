import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Administracion, Personas, Trabajadores } from '@post-tajamar/models';
import { ApiService } from '../../servicios/api/api.service';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';

@Component({
  selector: 'post-tajamar-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdministracionComponent implements OnInit {

  resultados = 0;
  dataSource = null;
  columnsToDisplay = ['accion', 'fecha', 'trabajador'];
  expandedElement: Administracion[] | null;

  trabajadores = new Array<Trabajadores>()
  administraciones = new Array<Administracion>()
  personas = new Array<Personas>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterSetter: GetterSetterService, private api: ApiService) { }

  ngOnInit(): void {
    this.obtenerAdministracion()
  }

  obtenerAdministracion() {
    this.getterSetter.Administracion.subscribe(
      administraciones => {
        this.administraciones = administraciones
        this.obtenerTrabajadores()
      }
    )
  }

  obtenerTrabajadores() {
    const select = "SELECT t.* from trabajadores t inner join administracion a on t.id = a.trabajadorId"
    this.api.get(select).subscribe(
      trabajadores => {
        this.trabajadores = trabajadores as Trabajadores[]
        this.obtenerPersonas()
      }
    )
  }

  obtenerPersonas() {
    const select = "SELECT p.* from personas p inner join trabajadores t on p.id = t.personaId inner join administracion a on t.id = a.trabajadorId"
    this.api.get(select).subscribe(
      personas => {
        this.personas = personas as Personas[]
        this.formatearDatosAdministracionesAntesDeMeterEnTabla()
      }
    )
  }

  formatearDatosAdministracionesAntesDeMeterEnTabla() {
    if (this.administraciones.length !== 0) {
      this.dataSource = new MatTableDataSource(
        this.administraciones.map((x) => {
          const trabajador = this.trabajadores.find(y => y.id === x.trabajadorId)
          let persona = "Anonima"
          if (trabajador !== undefined && trabajador !== null) {
          const personaSinFiltrar =  this.personas.find(z => z.id === trabajador.personaId)
          persona = personaSinFiltrar.nombre + " " + personaSinFiltrar.apellidos + " (" + personaSinFiltrar.dni + ")"
          }
          const partes = x.accion.split("--->")
          return {
            accion: partes[0].trim(),
            fecha: x.fecha,
            id: x.id,
            trabajadorId: persona,
            tabla: partes[1],

            cambios: partes[0].trim() === "CREAR" ?
              JSON.parse(partes[2]).nuevosCampos.map((x, i) => { return "<strong>Campo: </strong> " + x + "<br> <strong>Valor: </strong>" + JSON.parse(partes[2]).nuevosValores[i] }).join("<br><br>") :

              partes[0].trim() === "ACTUALIZAR" ?
                JSON.parse(partes[2]).map(x => { return '<strong>Campo: </strong>' + x.campo + '// Antiguo Valor: ' + x.antiguoValor + '--> Nuevo valor: ' + x.nuevoValor + '<br>' }) :

                JSON.parse(partes[2]).antiguosCampos.map((x, i) => { return "<strong>Campo: " + x + "</strong> // <strong> Valor: </strong>" + JSON.parse(partes[2]).nuevosValores[i] }).join("<br><br>")
          }
        })
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.resultados = this.dataSource.length;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resultados = this.dataSource.filteredData.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  // if (accion === "ACTUALIZAR") {
  //   let diferencias = new Array<{ campo: string, antiguoValor: string, nuevoValor: string }>()
  //   Object.keys(elemento).forEach(x => {
  //     if (elemento[x] !== antiguoElemento[x]) {
  //       diferencias.push({ campo: x, antiguoValor: antiguoElemento[x], nuevoValor: elemento[x] })
  //     }
  //   })
  //   accionAInsertar = diferencias
  // }
  // if (accion === "BORRAR") {
  //   let borrar: {antiguosCampos: string, antiguosValores: string}
  //   const antiguosCampos = Object.keys(elemento)
  //   const antiguosValores = antiguosCampos.map(x => { return elemento[x]})

  //   borrar = {
  //     antiguosCampos: JSON.stringify(antiguosCampos),
  //     antiguosValores: JSON.stringify(antiguosValores)
  //   }
  //   accionAInsertar = borrar
  // }
  // if (accion === "CREAR") {
  //   let crear: {nuevosCampos: string, nuevosValores: string}
  //   const nuevosCampos = Object.keys(elemento)
  //   const nuevosValores = nuevosCampos.map(x => { return elemento[x]})

  //   crear = {
  //     nuevosCampos: JSON.stringify(nuevosCampos),
  //     nuevosValores: JSON.stringify(nuevosValores)
  //   }
  //   accionAInsertar = crear
  // }
}
