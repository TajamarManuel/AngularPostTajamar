import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstadosPersona, Personas } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PersonaComponent } from '../persona/persona.component';

@Component({
  selector: 'post-tajamar-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PersonasComponent implements OnInit {

  editar = true

  resultados = 0
  dataSource = null;
  columnsToDisplay = ['dni', 'nombre', 'apellidos', 'email'];
  expandedElement: Personas[] | null;

  estados = new Array<EstadosPersona>()
  personas = new Array<Personas>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterSetter: GetterSetterService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerDatosPersonas()
  }

  obtenerDatosPersonas() {
    this.getterSetter.Personas.subscribe(personas => {
      this.personas = personas.sort((a, b) => b.id - a.id)
      this.getterSetter.EstadosPersona.subscribe(estados => {
        this.estados = estados
        this.formatearDatosPersonasAntesDeMeterEnTabla()
      })
    })
  }

  formatearDatosPersonasAntesDeMeterEnTabla() {
    this.dataSource = new MatTableDataSource(this.personas.map(x => {
      return {
        apellidos: x.apellidos,
        direccion: x.direccion,
        discapacidad: x.discapacidad,
        dni: x.dni,
        email: x.email,
        estadoId: this.estados.find(y => y.id === x.estadoId).estado,
        fechaNacimiento: x.fechaNacimiento,
        nombre: x.nombre,
        numeroHijos: x.numeroHijos,
        telefono: x.telefono,
        id: x.id,
        contrasena: x.contrasena
      }
    }))
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
    this.resultados = this.dataSource.length
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resultados = this.dataSource.filteredData.length
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarPersona(persona: any) {
    const personaFiltrada: Personas = persona
    personaFiltrada.estadoId = this.estados.find(x => x.estado === persona.estadoId).id
    this.dialog.open(PersonaComponent, { data: { persona:  personaFiltrada}, disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.obtenerDatosPersonas()
        }
      }
    )
  }
}
