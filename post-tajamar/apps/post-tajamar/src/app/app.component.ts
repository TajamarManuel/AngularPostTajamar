import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as AOS from 'aos';

@Component({
  selector: 'post-tajamar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  _insideFooter: boolean
  _rutasBorrarNavbar = ['welcome']

  constructor(
    public router: Router,
  ) { }

  @HostListener("window:scroll", ['$event'])
  ShowFooter($event: Event) {
    const valorDefecto = $event["srcElement"]["children"][0]
    const scrollTop = valorDefecto.scrollTop
    const height = window.outerHeight
    const outerHeight = document.getElementById('tighting').scrollHeight

    if (height + scrollTop > outerHeight + 140) {
      document.body.classList.add('tight')
    } else {
      document.body.classList.remove('tight')
    }
  }

  @HostListener('window:click', ['$event'])
  quitarTight() {
    if (document.body.classList.contains('tight') && !this._insideFooter) {
      document.body.classList.remove('tight')
      const id = 'tighting';
      const yOffset = 34;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().height - yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  mostrarBarra() {
    return !this._rutasBorrarNavbar.includes(this.router.url)
  }


  ngOnInit(): void {
    AOS.init();
  }
}
