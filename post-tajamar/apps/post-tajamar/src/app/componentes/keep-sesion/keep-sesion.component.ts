import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'post-tajamar-keep-sesion',
  templateUrl: './keep-sesion.component.html',
  styleUrls: ['./keep-sesion.component.scss']
})
export class KeepSesionComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<KeepSesionComponent>) { }

  ngOnInit(): void {
  }

  si() {
    this.dialogref.close(true)
  }

  no() {
    this.dialogref.close(false)
  }

}
