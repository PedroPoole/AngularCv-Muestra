import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { SupabaseService } from '../services/supabase.service'

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss']
})
export class DatospersonalesComponent implements OnInit {

  constructor(private readonly supabase: SupabaseService) { }

  @Input()
  arrCompleto!:Usuario;
  imageAddress!:string|undefined;
  edad: number | undefined;

  ngOnInit(): void {

    this.imageAddress=this.supabase.urlImagen(this.arrCompleto).data?.publicURL;
    this.edad=this.calcularEdad(this.arrCompleto.fechaNacimiento);
  }

  calcularEdad(fecha: Date) {
    var hoy = new Date();
    var nacimiento = new Date(fecha);
    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

}
