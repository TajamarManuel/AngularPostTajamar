import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from 'apps/post-tajamar/src/app/componentes/welcome/welcome.component';
import { NominasComponent } from 'apps/post-tajamar/src/app/componentes/nominas/nominas.component';
import { TrabajadoresComponent } from 'apps/post-tajamar/src/app/componentes/trabajadores/trabajadores.component';
import { PersonasComponent } from 'apps/post-tajamar/src/app/componentes/personas/personas.component';
import { OficinasComponent } from 'apps/post-tajamar/src/app/componentes/oficinas/oficinas.component';
import { CategoriasComponent } from 'apps/post-tajamar/src/app/componentes/categorias/categorias.component';
import { VerTodoComponent } from 'apps/post-tajamar/src/app/componentes/ver-todo/ver-todo.component';
import { AdministracionComponent } from 'apps/post-tajamar/src/app/componentes/administracion/administracion.component';
import { HistoricoCategoriasComponent } from 'apps/post-tajamar/src/app/componentes/historico-categorias/historico-categorias.component';

const appRoutes: Routes =  [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: 'Bienvenido' }
  },
  {
    path: 'nominas',
    component: NominasComponent,
    data: { title: 'Nóminas' }
  },
  {
    path: 'trabajadores',
    component: TrabajadoresComponent,
    data: { title: 'Trabajadores' }
  },
  {
    path: 'personas',
    component: PersonasComponent,
    data: { title: 'Personas' }
  },
  {
    path: 'oficinas',
    component: OficinasComponent,
    data: { title: 'Oficinas' }
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: { title: 'Categorias' }
  },
  {
    path: 'verTodo',
    component: VerTodoComponent,
    data: { title: 'Ver Todo' }
  },
  {
    path: 'historicoCategorias',
    component: HistoricoCategoriasComponent,
    data: { title: 'Historico Categorias' }
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    data: { title: 'Administracion' }
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutingModule {}