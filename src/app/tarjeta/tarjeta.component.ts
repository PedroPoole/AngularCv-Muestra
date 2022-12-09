
import { Component, OnInit ,Input } from '@angular/core';
import { Tarjeta } from '../models/Tarjeta';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {
  @Input()
  datos!: Tarjeta;

  constructor() {
    jobTitle: Text;
    jobDates: Text;
  }

  
  
  ngOnInit(): void {
    if(this.datos.urlVideo!=undefined&&this.datos.urlVideo!=''){
    

      //He sobreescrito la variable en la capa intermedia. Puede dar problemas más adelante.
      this.datos.urlVideo=(this.obtenerCodigoLink(this.datos.urlVideo)); 
    }
    
  }

  /**Sencillo método para obtener el código de un enlace. Lo he hecho con un split para asegurarme de que funciona
   * tanto con el enlace entero como sin el HTTPS
   */
  obtenerCodigoLink(link:String){
    let primerCorte=link.split('youtube.com/watch?v=')[1];
    try{
    return primerCorte.substring(0,11);
    }
    catch (Exception){
      return '';
    }

  }

}
