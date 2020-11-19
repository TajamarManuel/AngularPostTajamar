import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriasTrabajadores, HistoricosCategorias, Oficinas, Personas, Trabajadores } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';
interface Nominas { fecha: { ano: number, mes: number }, incrementoSalarial: number, Trabajador: Trabajadores, Personas: Personas, categorias: { categoria: CategoriasTrabajadores, sueldo: number, tiempo: number, porcentaje: number }[] }
@Component({
  selector: 'post-tajamar-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss'],
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
export class NominasComponent implements OnInit {

  trabajadores = new Array<Trabajadores>()
  personas = new Array<Personas>()
  historicos = new Array<HistoricosCategorias>()
  categorias = new Array<CategoriasTrabajadores>()
  oficinas = new Array<Oficinas>()

  resultados = 0;
  dataSource = null;
  columnsToDisplay = ['Fecha', 'TrabajadorNombre', 'Sueldo'];
  expandedElement: Nominas[] | null;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterSetter: GetterSetterService) { }

  ngOnInit(): void {
    this.getterSetter.Trabajadores.subscribe(
      trabajadores => {
        this.trabajadores = trabajadores
        this.getterSetter.Personas.subscribe(
          personas => {
            this.personas = personas
            this.getterSetter.HistoricosCategorias.subscribe(
              historicos => {
                this.historicos = historicos
                this.getterSetter.CategoriasTrabajadores.subscribe(
                  categorias => {
                    this.categorias = categorias
                    this.getterSetter.Oficinas.subscribe(
                      oficinas => {
                        this.oficinas = oficinas
                        this.generarDatosEnNominas()
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    )
  }

  generarDatosEnNominas() {
    const primeraFecha = this.trabajadores.map(x => x.fechaEntrada).sort((a, b) => a.getTime() - b.getTime())[0]
    let ultimaFecha = new Date()
    if (this.trabajadores.filter(x => x.fechaSalida === null).length !== 0) {
      ultimaFecha = this.trabajadores.map(x => x.fechaSalida).sort((a, b) => b.getTime() - a.getTime())[0]
    }

    const primerAno = new Date(primeraFecha).getFullYear()
    const primerMes = new Date(primeraFecha).getMonth()

    const ultimoAno = new Date(ultimaFecha === null || ultimaFecha === null ? new Date() : ultimaFecha).getFullYear()
    const ultimoMes = new Date(ultimaFecha === null || ultimaFecha === null ? new Date() : ultimaFecha).getMonth()

    const anoMes = new Array<{ ano: number, meses: Array<number> }>()
    for (let i = primerAno; i <= primerAno; i++) {
      const meses = new Array<number>()
      if (i === primerAno) {
        let ultimoMesCalculado = 12
        if (ultimoAno === primerAno) {
          if (primerMes === ultimoMes) {
            ultimoMesCalculado = ultimoMes
          }
        }
        for (let mes = primerMes; mes <= ultimoMesCalculado; mes++) {
          meses.push(mes);
        }
      } else if (i === ultimoAno) {
        for (let mes = ultimoMes; mes < (12 - ultimoMes); mes++) {
          meses.push(mes)
        }
      } else {
        for (let mes = 0; mes < 12; mes++) {
          meses.push(mes)
        }
      }
      anoMes.push({ ano: i, meses: meses })
    }
    const nominas = new Array<Nominas>()
    anoMes.forEach(x => {
      x.meses.forEach(y => {
        let categorias = new Array<{ categoria: CategoriasTrabajadores, sueldo: number, tiempo: number, porcentaje: number }>()
        this.trabajadores.filter(z => new Date(z.fechaEntrada).getFullYear() === x.ano && new Date(z.fechaEntrada).getMonth() === y).forEach(n => {
          let incrementoSalarial = 0

          const personas = this.personas.find(m => m.id === n.personaId)

          incrementoSalarial = incrementoSalarial + personas.discapacidad * 0.1
          incrementoSalarial = incrementoSalarial + personas.numeroHijos * 2


          this.historicos.map(m => {
            const k = m
            if (m.fechaSalida !== null) {
              k.fechaSalida = new Date()
            }
            return k
          }).filter(m => new Date(m.fechaUpgrade).getFullYear() >= x.ano && new Date(m.fechaSalida).getFullYear() <= x.ano && new Date(m.fechaUpgrade).getMonth() >= y && new Date(m.fechaSalida).getMonth() <= y).sort((a, b) => new Date(b.fechaSalida).getTime() - new Date(a.fechaSalida).getTime()).map(
            m => {
              const categoria = this.categorias.find(k => k.id === m.categoriasTrabajadorId)
              let tiempo = 31

              if (new Date(m.fechaUpgrade).getFullYear() === x.ano && new Date(m.fechaUpgrade).getMonth() === y) {
                if (new Date(m.fechaSalida).getFullYear() === x.ano && new Date(m.fechaUpgrade).getMonth() === y) {
                  tiempo = new Date(m.fechaSalida).getDate() - new Date(m.fechaUpgrade).getDate()
                } else {
                  tiempo = 31 - new Date(m.fechaUpgrade).getDate()
                }
              } else if (new Date(m.fechaSalida).getFullYear() === x.ano && new Date(m.fechaUpgrade).getMonth() === y) {
                tiempo = 31 - new Date(m.fechaSalida).getDate()
              }

              const sueldoCalculado = ((n.sueldoBase * categoria.incrementoSalarial / 100 + n.sueldoBase) / 31) * tiempo
              return {
                categoria: categoria,
                sueldo: sueldoCalculado,
                tiempo: tiempo,
                porcentaje: categoria.incrementoSalarial
              }
            }
          ).forEach(k => categorias.push(k))

          nominas.push({ fecha: { ano: x.ano, mes: y }, Personas: this.personas.find(k => k.id === n.personaId), Trabajador: n, categorias: categorias, incrementoSalarial: incrementoSalarial })
        })
      })
    })
    this.formatearDatosNominasAntesDeMeterEnTabla(nominas)
  }

  formatearDatosNominasAntesDeMeterEnTabla(nominas: Nominas[]) {
    this.dataSource = new MatTableDataSource(
      nominas.map(x => {
        let y = null
        y = x
        y.nombre = x.Personas.nombre + " " + x.Personas.apellidos
        y.fecha = x.fecha.ano + "/" + this.traducirMes(x.fecha.mes)
        const sueldoCurrent = x.categorias.map(z => z.sueldo).reduce((acumulativo, current) => acumulativo = acumulativo + current)
        const sueldo = String((x.incrementoSalarial * sueldoCurrent) / 100 + sueldoCurrent).replace(".",",")
        y.sueldo = sueldo.substr(0, sueldo.indexOf(",")+3) + " €" 

        return y
      })
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.resultados = this.dataSource.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  traducirMes(mes: number) {
    switch (mes) {
      case 1:
        return "Enero"
        break;
      case 2:
        return "Febrero"

        break;
      case 3:
        return "Marzo"

        break;
      case 4:
        return "Abril"

        break;
      case 5:
        return "Mayo"

        break;
      case 6:
        return "Junio"

        break;
      case 7:
        return "Julio"

        break;
      case 8:
        return "Agosto"

        break;
      case 9:
        return "Septiembre"

        break;
      case 10:
        return "Octubre"

        break;
      case 11:
        return "Noviembre"

        break;
      case 12:
        return "Diciembre"

        break;

      default:
        return "Fallo"
        break;
    }
  }

  formatearPrimerSueldo(sueldo: number) {
    const back = String(sueldo).replace(".",",")
    return back.substr(0, back.indexOf(",")+3) + " €"
  }

  formatearPorcentaje(porcentaje: any) {
    const por = String(porcentaje)
    return por.substr(0,por.indexOf(",")+2)
  }

  nombreOficina(oficina: number) {
    return this.oficinas.find(x => x.id === oficina).oficina
  }
}
