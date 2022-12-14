import { Component, Input, OnInit } from '@angular/core';
import {Seccion} from '../models/Seccion';

import {Tarjeta} from '../models/Tarjeta';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss']
})
export class SeccionComponent implements OnInit {
  @Input()
  datos!: Seccion;

  tarjetas!:any;
  constructor() { }

  ngOnInit(): void {
    this.tarjetas=Object.values(this.datos.tarjetas);    
  }

}
