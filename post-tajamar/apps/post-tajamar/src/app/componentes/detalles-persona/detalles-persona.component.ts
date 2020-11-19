import { Component, Input, OnInit } from '@angular/core';
import { Personas } from '@post-tajamar/models';
import { GetterSetterService } from '../../servicios/getterSetter/getter-setter.service';

@Component({
  selector: 'post-tajamar-detalles-persona',
  templateUrl: './detalles-persona.component.html',
  styleUrls: ['./detalles-persona.component.scss']
})
export class DetallesPersonaComponent implements OnInit {

  @Input() persona: Personas
  estado = null
  constructor(private getterSetter: GetterSetterService) { }

  ngOnInit(): void {
    this.getterSetter.EstadosPersona.subscribe(
      res => {
        this.estado = res.find(x => x.id === this.persona.estadoId).estado
      }
    )
  }

}
