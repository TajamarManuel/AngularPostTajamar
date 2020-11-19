import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  private key: "uhalsdfjaosidjfalksdjfñaiosjefañisoidfjaosdjfaiosdjfaosjqiowejoi2^0934u90128401923jñfldasjfi3j833jlkjfoasjdfldakjsdfl@jlasdjfas"
  constructor() { }

  encriptar(value: any) {
    const key = CryptoJS.enc.Utf8.parse(this.key)
    const iv = CryptoJS.enc.Utf8.parse(this.key)
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CTRGladman,
      padding: CryptoJS.pad.Pkcs7
    })
    let encriptacion = encrypted.toString()
    while (encriptacion.indexOf("=") !== -1) {
      encriptacion = encriptacion.replace("=", "equ")
    }

    return encriptacion.toString()
  }
}
