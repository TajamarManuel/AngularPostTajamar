import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroupsModule } from "@post-tajamar/form-group";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
@Component({
  selector: 'post-tajamar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class LoginComponent implements OnInit {
  hide = true
  constructor(private formGroups: FormGroupsModule, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  tryLogin() {
    this.dialogRef.close({ enviado: true, email: this.correo_value, contrasena: this.contrasena_value })
  }

  close() {
    this.dialogRef.close({ enviado: false })
  }

  get correo() { return this.loginFormulario.get("correo") }
  get contrasena() { return this.loginFormulario.get("contrasena") }

  get correo_value() { return this.loginFormulario.value.correo }
  get contrasena_value() { return this.loginFormulario.value.contrasena }

  get loginFormulario() { return this.formGroups.loginForm }
}
