import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service'
import { Usuario } from './models/Usuario';
export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  arrCompleto!: Usuario;
  edad: number | undefined;
  imageAddress:string|undefined='https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png';
  constructor(private readonly supabase: SupabaseService,) {

  }

  title = 'NgCV';


  /**Al iniciar, necesito obtener el objeto del servicio que conecta con la API. Se lo atribuyo a "arrCompleto" (Nota: Es realmente
   un objeto, no un array, pero TScript no tiene objetos relacionales).
  * El siguiente paso es convertir la fecha de nacimiento en edad para mantenerla actualizada. 
  * Ambas cosas se hacen de forma asincronia con una promesa, puesto que el servicio puede tardar un segundo en enviarlo.
    **/
  ngOnInit(): void {
    this.supabase.dameTodo(8).then((coso) => {
      this.arrCompleto = coso;      
    })

  }

  //No necesito preocuparme por si el objeto es indefinido ya que sólo llamo al método dentro del 
  //*NgIf, que ya comprueba que arrCompleto esté definido, y la edad es un campo not null.
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




};





