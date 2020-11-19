import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import { CrearOficinaComponent } from '../crear-oficina/crear-oficina.component';
import { CrearTrabajadorComponent } from '../crear-trabajador/crear-trabajador.component';

@Component({
  selector: 'post-tajamar-ver-todo',
  templateUrl: './ver-todo.component.html',
  styleUrls: ['./ver-todo.component.scss']
})
export class VerTodoComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  crearTrabajador() {
    this.dialog.open(CrearTrabajadorComponent, { disableClose: true }).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.router.navigate(['trabajadores'])
        }
      }
    )
  }

  crearCategoria() {
    this.dialog.open(CrearCategoriaComponent, {disableClose: true}).afterClosed().subscribe(
      resultado => {
        if (resultado.enviado === true) {
          this.router.navigate(['categorias'])
        }
      }
    )
  }

  crearOficina() {
    this.dialog.open(CrearOficinaComponent, {disableClose: true}).afterClosed().subscribe(
      reusltado => {
        if (reusltado.enviado === true) {
          this.router.navigate(['oficinas'])
        }
      }
    )
  }

}
