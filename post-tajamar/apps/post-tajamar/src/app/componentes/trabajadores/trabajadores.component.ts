import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { speedDialFabAnimations } from './float.animation';
import {
  CategoriasTrabajadores,
  Oficinas,
  Personas,
  Trabajadores,
} from '@post-tajamar/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { MatTableDataSource } from '@angular/material/table';
// import { DetallesTrabajadorComponent } from '../detalles-trabajador/detalles-trabajador.component';
import { ApiService } from '../../servicios/api/api.service';
import { CrearTrabajadorComponent } from '../crear-trabajador/crear-trabajador.component';
@Component({
  selector: 'post-tajamar-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss'],
  animations: [
    speedDialFabAnimations,
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
export class TrabajadoresComponent implements OnInit {

  @Input() crearBotonFixed: string = 'true'

  editar = false;

  fabButtons = [
    {
      icon: 'add',
      accion: 'crear',
    },
    {
      icon: 'edit',
      accion: 'editar',
    },
  ];
  buttons = [];

  fabTogglerState = 'inactive';
  resultados = 0;
  dataSource = null;
  columnsToDisplay = ['nombre', 'oficina', 'categoria'];
  expandedElement: Trabajadores[] | null;

  categoriasTrabajadores = new Array<CategoriasTrabajadores>();
  trabajadores = new Array<Trabajadores>();
  personasTrabajadores = new Array<Personas>();
  oficinas = new Array<Oficinas>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    private getterSetter: GetterSetterService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerDatosPersonas();
    if (!(this.crearBotonFixed === 'false' ? false : true)) {
      this.editar = true
    }
  }

  obtenerDatosPersonas() {
    const select =
      'select p.* from personas p inner join trabajadores t on p.id = t.personaId';
    this.api.get(select).subscribe((personas) => {
      this.personasTrabajadores = personas as Personas[];
      this.obtenerDatosTrabajadores();
    });
  }

  obtenerDatosTrabajadores() {
    this.getterSetter.Trabajadores.subscribe((trabajadores) => {
      this.trabajadores = trabajadores.sort((a, b) => b.id - a.id);
      this.getterSetter.CategoriasTrabajadores.subscribe((categorias) => {
        this.categoriasTrabajadores = categorias;
        this.getterSetter.Oficinas.subscribe((oficinas) => {
          this.oficinas = oficinas;
          this.formatearDatosPersonasAntesDeMeterEnTabla();
        });
      });
    });
  }

  formatearDatosPersonasAntesDeMeterEnTabla() {
    if (this.trabajadores.length !== 0) {
      this.dataSource = new MatTableDataSource(
        this.trabajadores.map((x) => {
          return {
            categoriaTrabajadorId: this.categoriasTrabajadores.find(
              (y) => y.id === x.categoriaTrabajadorId
            ).categoria,
            fechaBaja: x.fechaBaja,
            fechaEntrada: x.fechaEntrada,
            fechaSalida: x.fechaSalida,
            motivoBaja: x.motivoBaja,
            motivoDespido: x.motivoDespido,
            oficinaId: this.oficinas.find((y) => y.id === x.oficinaId).oficina,
            personaId: this.personasTrabajadores
              .filter((y) => y.id === x.personaId)
              .map((y) => y.nombre + ' ' + y.apellidos + ' (' + y.dni + ')')[0],
            sueldoBase: x.sueldoBase,
            id: x.id,
          };
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

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  accion(accion: string) {
    if (accion === 'crear') {
      this.openTrabajador();
    } else if (accion === 'editar') {
      this.editar = !this.editar;
    }
  }

  editarTrabajador(trabajadorId: number) {
    const trabajadorFiltrado = this.trabajadores.find(x => x.id === trabajadorId)
    this.openTrabajador(trabajadorFiltrado)
  }

  openTrabajador(trabajador?: Trabajadores) {
    let data = null;
    if (trabajador !== undefined && trabajador !== null) {
      data = { trabajador: trabajador };
    }
    this.dialog
      .open(CrearTrabajadorComponent, { data: data, disableClose: true })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado.enviado === true) {
          this.obtenerDatosPersonas();
        }
      });
  }
}
