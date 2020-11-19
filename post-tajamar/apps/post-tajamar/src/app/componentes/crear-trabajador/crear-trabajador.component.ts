import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupsModule } from '@post-tajamar/form-group';
import {
  CategoriasTrabajadores,
  HistoricosCategorias,
  Oficinas,
  Personas,
  Trabajadores,
} from '@post-tajamar/models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../servicios/api/api.service';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
import { HistoricosService  } from "../../servicios/historicosService/historicos-service.service";

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
@Component({
  selector: 'post-tajamar-crear-trabajador',
  templateUrl: './crear-trabajador.component.html',
  styleUrls: ['./crear-trabajador.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class CrearTrabajadorComponent implements OnInit {

  oficinas = new Array<Oficinas>();
  categorias = new Array<CategoriasTrabajadores>();
  trabajadores = new Array<Trabajadores>();
  personas = new Array<Personas>();

  diaHoy = new Date(new Date().setDate(new Date().getDate() - 1));
  filteredOptionsCategorias: Observable<
    {
      grupo: string;
      categoria: {
        categoria: string;
        categoriaHtml: string;
        disabled: boolean;
      }[];
    }[]
  >;
  filteredOptionsOficinas: Observable<
    {
      grupo: string;
      oficina: { oficina: string; oficinaHtml: string; disabled: boolean }[];
    }[]
  >;
  filteredOptionsPersonas: Observable<
    {
      grupo: string;
      persona: { persona: string; personaHtml: string; disabled: boolean }[];
    }[]
  >;

  constructor(
    private dialogRef: MatDialogRef<CrearTrabajadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trabajador: Trabajadores },
    private getterSetter: GetterSetterService,
    private api: ApiService,
    private formGroups: FormGroupsModule,
    private historico: HistoricosService
  ) { }

  ngOnInit(): void {
    this.obtenerOficinas();
  }

  cerrarDialog() {
    this.dialogRef.close({ enviado: false });
  }

  validarFormulario() {
    if (this.crearTrabajadorFormulario.valid) {
      if (this.data !== null && this.data !== undefined) {
        if (this.data.trabajador !== null && this.data.trabajador !== undefined) {
          if (this.personas.filter(x => x.dni = this.persona_value).length !== 0 && this.oficinas.filter(x => x.oficina = x.oficina).length !== 0 && this.categorias.filter(x => x.categoria === this.categoriaTrabajador_value).length !== 0) {

            const trabajador: Trabajadores = {
              categoriaTrabajadorId: this.categorias.find(
                x => x.categoria === this.categoriaTrabajador_value
              ).id,
              fechaBaja: null,
              fechaEntrada: this.fechaEntrada_value,
              fechaSalida: null,
              motivoBaja: null,
              motivoDespido: null,
              oficinaId: this.oficinas.find((x) => x.oficina === this.oficina_value).id,
              personaId: this.personas.find((x) => x.dni === this.persona_value).id,
              sueldoBase: this.sueldoBase_value,
              id: this.data.trabajador.id
            };

            if (this.data.trabajador.categoriaTrabajadorId !== trabajador.categoriaTrabajadorId || this.data.trabajador.fechaBaja !== trabajador.fechaBaja || this.data.trabajador.fechaEntrada !== trabajador.fechaEntrada || this.data.trabajador.fechaSalida !== trabajador.fechaSalida || this.data.trabajador.motivoBaja !== trabajador.motivoBaja || this.data.trabajador.motivoDespido !== trabajador.motivoDespido || this.data.trabajador.oficinaId !== trabajador.oficinaId || this.data.trabajador.personaId !== trabajador.personaId || this.data.trabajador.sueldoBase !== trabajador.sueldoBase || this.data.trabajador.id !== trabajador.id) {
              return false
            } else {
              return true
            }
          }
          return true
        }
      } else {
        return false
      }
    } else {
      return true
    }
  }

  opcionesFiltradasCargarCategorias() {
    this.filteredOptionsCategorias = this.categoriaTrabajador.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCategorias(value))
    );
  }
  opcionesFiltradasCargarOficinas() {
    this.filteredOptionsOficinas = this.oficina.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterOficinas(value))
    );
  }

  opcionesFiltradasCargarPersonas() {
    this.filteredOptionsPersonas = this.persona.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPersonas(value))
    );
  }

  crearTrabajador() {
    const trabajador: Trabajadores = {
      categoriaTrabajadorId: this.categorias.find(
        (x) => x.categoria === this.categoriaTrabajador_value
      ).id,
      fechaBaja: null,
      fechaEntrada: this.fechaEntrada_value,
      fechaSalida: null,
      motivoBaja: null,
      motivoDespido: null,
      oficinaId: this.oficinas.find((x) => x.oficina === this.oficina_value).id,
      personaId: this.personas.find((x) => x.dni === this.persona_value).id,
      sueldoBase: this.sueldoBase_value
    };
    if (this.data !== null && this.data !== undefined) {
      if (this.data.trabajador !== null && this.data.trabajador !== undefined) {
        trabajador.id = this.data.trabajador.id
      }
    }
    this.getterSetter.setTrabajadores(trabajador);
    this.historico.cambiarCategoriaTrabajador(trabajador, trabajador.categoriaTrabajadorId)
    this.dialogRef.close({ enviado: true });
  }

  obtenerOficinas() {
    this.getterSetter.Oficinas.subscribe((oficinas) => {
      this.oficinas = oficinas;
      this.obtenerCategorias();
    });
  }

  obtenerCategorias() {
    this.getterSetter.CategoriasTrabajadores.subscribe((categorias) => {
      this.categorias = categorias;
      this.obtenerDatosPersonas();
    });
  }

  obtenerDatosPersonas() {
    let obtencion = null
    if (this.data !== undefined && this.data !== null) {
      if (this.data.trabajador !== null && this.data.trabajador !== undefined) {
        const select = 'select p.* from personas p inner join trabajadores t on p.id = t.personaId';
        obtencion = this.api.get(select)
      } else {
        const select = 'select p.* from personas p left join trabajadores t on p.id <> t.personaId';
        obtencion = this.api.get(select)
      }
    } else {
      const select = 'select p.* from personas p left join trabajadores t on p.id <> t.personaId';
      obtencion = this.api.get(select)
    }
    obtencion.subscribe((personas) => {
      this.personas = personas as Personas[];
      this.opcionesFiltradasCargarOficinas();
      this.opcionesFiltradasCargarCategorias();
      this.opcionesFiltradasCargarPersonas();
      if (this.data !== null && this.data !== undefined) {
        if (this.data.trabajador !== undefined && this.data.trabajador !== null) {
          this.categoriaTrabajador.setValue(this.categorias.find(x => x.id === this.data.trabajador.categoriaTrabajadorId).categoria)
          this.oficina.setValue(this.oficinas.find(x => x.id === this.data.trabajador.oficinaId).oficina)
          this.sueldoBase.setValue(this.data.trabajador.sueldoBase)
          this.fechaEntrada.setValue(this.data.trabajador.fechaEntrada)
          this.persona.setValue(this.personas.find(x => x.id === this.data.trabajador.personaId).dni)
        } else {
          this.crearTrabajadorFormulario.reset()
        }
      } else {
        this.crearTrabajadorFormulario.reset()
      }
    });
  }

  private _filterOficinas(
    value: string
  ): {
    grupo: string;
    oficina: { oficina: string; oficinaHtml: string; disabled: boolean }[];
  }[] {
    const filterValue = value.toLowerCase();
    if (filterValue === '') {
      return [
        ...[
          {
            grupo: 'Todos',
            oficina: this.oficinas
              .filter(
                (oficina) =>
                  !oficina.oficina.toLowerCase().includes(filterValue)
              )
              .map((x) => {
                return {
                  oficina: x.oficina,
                  oficinaHtml: this.primeraMayuscula(x.oficina + " - " + this.primeraMayuscula(x.direccion)),
                  disabled: false,
                };
              }) || [
                { oficina: 'ninguno', oficinaHtml: 'ninguno', disabled: true },
              ],
          },
        ],
      ];
    } else {
      const empiezanPor = this.oficinas
        .filter((oficina) =>
          oficina.oficina.toLocaleLowerCase().startsWith(filterValue)
        )
        .map((x) => {
          return {
            oficina: x.oficina,
            oficinaHtml: this.ponerNegrita(filterValue, x.oficina + " - " + this.primeraMayuscula(x.direccion)),
            disabled: false,
          };
        });
      const contienen = this.oficinas
        .filter(
          (oficina) =>
            !oficina.oficina.toLowerCase().startsWith(filterValue) &&
            oficina.oficina.toLowerCase().includes(filterValue)
        )
        .map((x) => {
          return {
            oficina: x.oficina,
            oficinaHtml: this.ponerNegrita(filterValue, x.oficina + " - " + this.primeraMayuscula(x.direccion)),
            disabled: false,
          };
        });
      const otros = this.oficinas
        .filter(
          (oficina) => !oficina.oficina.toLowerCase().includes(filterValue)
        )
        .map((x) => {
          return {
            oficina: x.oficina,
            oficinaHtml: this.primeraMayuscula(x.oficina + " - " + this.primeraMayuscula(x.direccion)),
            disabled: false,
          };
        });
      const ninguno = [
        { oficina: 'ninguno', oficinaHtml: 'ninguno', disabled: true },
      ];
      let opciones = [
        ...[
          {
            grupo: 'Empiezan por: "' + this.primeraMayuscula(filterValue) + '"',
            oficina: empiezanPor.length !== 0 ? empiezanPor : ninguno,
          },
        ],
        ...[
          {
            grupo: 'Contienen: "' + this.primeraMayuscula(filterValue) + '"',
            oficina: contienen.length !== 0 ? contienen : ninguno,
          },
        ],
      ];
      if (otros.length !== 0) {
        opciones = [...opciones, ...[{ grupo: 'Otros', oficina: otros }]];
      }
      return opciones;
    }
  }



  private _filterPersonas(
    value: string
  ): {
    grupo: string;
    persona: { persona: string; personaHtml: string; disabled: boolean }[];
  }[] {
    const filterValue = value.toLowerCase();
    if (filterValue === '') {
      return [
        ...[
          {
            grupo: 'Todos',
            persona: this.personas
              .filter(
                (persona) => !persona.dni.toLowerCase().includes(filterValue)
              )
              .map((x) => {
                return {
                  persona: x.dni,
                  personaHtml: x.dni.toLocaleUpperCase() + ' - ' + this.primeraMayuscula(x.apellidos) + ', ' + this.primeraMayuscula(x.nombre),
                  disabled: false,
                };
              }) || [
                { persona: 'ninguno', personaHtml: 'ninguno', disabled: true },
              ],
          },
        ],
      ];
    } else {
      const empiezanPor = this.personas
        .filter((persona) =>
          persona.dni.toLocaleLowerCase().startsWith(filterValue)
        )
        .map((x) => {
          return {
            persona: x.dni,
            personaHtml: this.ponerNegrita(
              filterValue,
              x.dni.toLocaleUpperCase() + ' - ' + this.primeraMayuscula(x.apellidos) + ', ' + this.primeraMayuscula(x.nombre)
            ),
            disabled: false,
          };
        });
      const contienen = this.personas
        .filter(
          (persona) =>
            (!persona.dni.toLowerCase().startsWith(filterValue) &&
              persona.dni.toLowerCase().includes(filterValue)) ||
            persona.nombre.toLowerCase().includes(filterValue) ||
            persona.nombre.toLowerCase().includes(filterValue)
        )
        .map((x) => {
          return {
            persona: x.dni,
            personaHtml: this.ponerNegrita(
              filterValue,
              x.dni.toLocaleUpperCase() + ' - ' + this.primeraMayuscula(x.apellidos) + ', ' + this.primeraMayuscula(x.nombre)
            ),
            disabled: false,
          };
        });
      const otros = this.personas
        .filter((persona) => !persona.dni.toLowerCase().includes(filterValue))
        .map((x) => {
          return {
            persona: x.dni,
            personaHtml: x.dni.toLocaleUpperCase() + ' - ' + this.primeraMayuscula(x.apellidos) + ', ' + this.primeraMayuscula(x.nombre),
            disabled: false,
          };
        });
      const ninguno = [
        { persona: 'ninguno', personaHtml: 'ninguno', disabled: true },
      ];
      let opciones = [
        ...[
          {
            grupo: 'Empiezan por: "' + this.primeraMayuscula(filterValue) + '"',
            persona: empiezanPor.length !== 0 ? empiezanPor : ninguno,
          },
        ],
        ...[
          {
            grupo: 'Contienen: "' + this.primeraMayuscula(filterValue) + '"',
            persona: contienen.length !== 0 ? contienen : ninguno,
          },
        ],
      ];
      if (otros.length !== 0) {
        opciones = [...opciones, ...[{ grupo: 'Otros', persona: otros }]];
      }
      return opciones;
    }
  }

  private _filterCategorias(
    value: string
  ): {
    grupo: string;
    categoria: {
      categoria: string;
      categoriaHtml: string;
      disabled: boolean;
    }[];
  }[] {
    const filterValue = value.toLowerCase();
    if (filterValue === '') {
      return [
        ...[
          {
            grupo: 'Todos',
            categoria: this.categorias
              .filter(
                (categoria) =>
                  !categoria.categoria.toLowerCase().includes(filterValue)
              )
              .map((x) => {
                return {
                  categoria: x.categoria,
                  categoriaHtml: x.categoria,
                  disabled: false,
                };
              }) || [
                {
                  categoria: 'ninguno',
                  categoriaHtml: 'ninguno',
                  disabled: true,
                },
              ],
          },
        ],
      ];
    } else {
      const empiezanPor = this.categorias
        .filter((categoria) =>
          categoria.categoria.toLocaleLowerCase().startsWith(filterValue)
        )
        .map((x) => {
          return {
            categoria: x.categoria,
            categoriaHtml: this.ponerNegrita(filterValue, x.categoria),
            disabled: false,
          };
        });
      const contienen = this.categorias
        .filter(
          (categoria) =>
            !categoria.categoria.toLowerCase().startsWith(filterValue) &&
            categoria.categoria.toLowerCase().includes(filterValue)
        )
        .map((x) => {
          return {
            categoria: x.categoria,
            categoriaHtml: this.ponerNegrita(filterValue, x.categoria),
            disabled: false,
          };
        });
      const otros = this.categorias
        .filter(
          (categoria) =>
            !categoria.categoria.toLowerCase().includes(filterValue)
        )
        .map((x) => {
          return {
            categoria: x.categoria,
            categoriaHtml: x.categoria,
            disabled: false,
          };
        });
      const ninguno = [
        { categoria: 'ninguno', categoriaHtml: 'ninguno', disabled: true },
      ];
      let opciones = [
        ...[
          {
            grupo: 'Empiezan por: "' + this.primeraMayuscula(filterValue) + '"',
            categoria: empiezanPor.length !== 0 ? empiezanPor : ninguno,
          },
        ],
        ...[
          {
            grupo: 'Contienen: "' + this.primeraMayuscula(filterValue) + '"',
            categoria: contienen.length !== 0 ? contienen : ninguno,
          },
        ],
      ];
      if (otros.length !== 0) {
        opciones = [...opciones, ...[{ grupo: 'Otros', categoria: otros }]];
      }
      return opciones;
    }
  }

  ponerNegrita(filtro: any, palabra: string) {
    palabra = palabra;
    let comienzoPalabra = palabra.substr(0, palabra.indexOf(filtro));
    const finalPalabra = palabra.substr(
      palabra.toLocaleLowerCase().indexOf(filtro.toLocaleLowerCase()) + filtro.length
    );

    if (
      comienzoPalabra !== null &&
      comienzoPalabra !== undefined &&
      comienzoPalabra !== ''
    ) {
      comienzoPalabra = this.primeraMayuscula(comienzoPalabra);
    } else {
      filtro = this.primeraMayuscula(filtro);
    }
    return comienzoPalabra + '<strong>' + filtro + '</strong>' + finalPalabra;
  }

  primeraMayuscula(value: string) {
    const primeraLetra = value.substr(0, 1);
    const demas = value.substr(1);

    return primeraLetra.toLocaleUpperCase() + demas;
  }

  opcionValidaPersonas() {
    return this.personas.map((x) => x.dni).includes(this.persona_value);
  }

  opcionValidaOficinas() {
    return this.oficinas.map((x) => x.oficina).includes(this.oficina_value);
  }

  opcionValidaCategorias() {
    return this.categorias
      .map((x) => x.categoria)
      .includes(this.categoriaTrabajador_value);
  }

  get categoriaTrabajador() {
    return this.crearTrabajadorFormulario.get('categoriaTrabajador');
  }
  get categoriaTrabajador_value() {
    return this.crearTrabajadorFormulario.value.categoriaTrabajador;
  }
  get fechaEntrada() {
    return this.crearTrabajadorFormulario.get('fechaEntrada');
  }
  get fechaEntrada_value() {
    return this.crearTrabajadorFormulario.value.fechaEntrada;
  }
  get oficina() {
    return this.crearTrabajadorFormulario.get('oficina');
  }
  get oficina_value() {
    return this.crearTrabajadorFormulario.value.oficina;
  }
  get persona() {
    return this.crearTrabajadorFormulario.get('persona');
  }
  get persona_value() {
    return this.crearTrabajadorFormulario.value.persona;
  }
  get sueldoBase() {
    return this.crearTrabajadorFormulario.get('sueldoBase');
  }
  get sueldoBase_value() {
    return this.crearTrabajadorFormulario.value.sueldoBase;
  }

  get crearTrabajadorFormulario() {
    return this.formGroups.creacionTrabajador;
  }
}
