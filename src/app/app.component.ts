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
  constructor(private readonly supabase: SupabaseService,) {
  }

  title = 'NgCV';

  /**Al iniciar, necesito obtener el objeto del servicio que conecta con la API. Se lo atribuyo a "arrCompleto" (Nota: Es realmente
   un objeto, no un array, pero TScript no tiene objetos relacionales).
  * El siguiente paso es convertir la fecha de nacimiento en edad para mantenerla actualizada. 
  * Ambas cosas se hacen de forma asincronia con una promesa, puesto que el servicio puede tardar un segundo en enviarlo.
    **/
  ngOnInit(): void {
    this.supabase.dameTodo(10).then((coso) => {
      this.arrCompleto = coso;      
    })

  }
};





