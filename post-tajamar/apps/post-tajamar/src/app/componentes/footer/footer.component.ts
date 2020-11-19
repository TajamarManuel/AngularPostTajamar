import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'post-tajamar-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init()
  }

}