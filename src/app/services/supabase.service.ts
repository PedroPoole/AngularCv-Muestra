import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js'
import { resolve } from 'dns';
import { environment } from '../../environments/environment'
import { Seccion } from '../models/Seccion';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  //Creo la conexión con la API de la base de datos de supabase. He guardado en environment las claves API, pero no pasa nada
  //porque sean públicas, pues manejo la seguridad a nivel base de datos.
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  //Consulta que retorna los valores necesarios de un usuario.
  dameUsuario(id: number) {
    return this.supabase.
      from('datos').
      select('nombre, apellidos, sobreMi, fechaNacimiento, email, telefono, direccion,nombreSobreMi,descripcion,imgurl,codusu').
      eq('codusu', id).
      single()
  }

  //Consulta que retorna los valores necesarios de una "sección" (Estudios, experiencia profesional...).
  dameSecciones(id: number) {
    return this.supabase.
      from('seccion').
      select('nombre,orden,codSeccion').
      eq('codusu', id)
      .eq('ignorar', false)
      
  }

  urlImagen(arrCompleto:Usuario){
    return this.supabase
    .storage
    .from(arrCompleto.codusu.toString())
    .getPublicUrl(arrCompleto.imgurl)
  }

//Consulta que retorna los valores necesarios de una "tarjeta" (Cada una de las entradas individuales de las secciones.).
//Nótese que sacamos todas las tarjetas de un USUARIO, no de una sección. Esto es porque más adelante obtendremos todas las 
//tarjetas en una consulta, y luego las distribuiremos entre secciones con una función.
  dameTarjetas(codusu: number) {
    return this.supabase.
    from('tarjeta').
      select('*').
      eq('codusu', codusu)
      .eq('ignorar', false)
    
  }

  dameClanes(){
    return this.supabase
    .from('clan')
    .select('*')
  }


  /** Función relativamente compleja. El objetivo final es crear un objeto asociativo de tres niveles de profundidad 
   * (usuario con sus secciones, cada sección con sus tarjetas)
   * Para eso usa una serie de promesas encadenadas y bucles forEach. */
  dameTodo(id: number) {
    let datos:Usuario;
    return new Promise<Usuario>(resolve=>{ //En este caso resolve es lo que retorna una promesa que se llama con .then. Si usas return no funciona.

      this.dameUsuario(id).then((infoUsuario) => {
        datos = infoUsuario.data;
  
        // Como Typescript no aguanta los arrays relacionales, hay que usar objetos. Y no se puede hacer push() a un objeto.
        // Por lo tanto, es necesario cuando creas una clave que luego vas a poblar, crearla definida como un objeto vacío.
        this.dameSecciones(id).then((infoSecciones)=>{
          datos['secciones']={}; 


          // Por cada sección que retorne la base de datos, la guardamos en su sección del objeto. 
          //Además, en cada una de ellas inicializamos ya la clave "tarjetas" como objeto vacío, porque si hay sección, esta tendrá datos.
          infoSecciones.data?.forEach(element => {
            datos['secciones'][element.nombre]=element;
            datos['secciones'][element.nombre]['tarjetas']={};
          });


          // Aquí es donde la cosa se pone peliaguda. Para no realizar una consulta por cada sección a la base de datos, hemos tomado todas
          // las tarjetas, así que vamos a distribuirlas. Por cada SECCIÓN, iteramos entre todas las TARJETAS.
          this.dameTarjetas(id).then((infoTarjetas)=>{

            //Esta parte la he optimizado de código que CREO que es redundante, pero que dejaré comentado solo por si todo explota luego.
            //(Object.keys(datos.secciones) as (keyof typeof datos.secciones)[]).forEach((key) =>{ 
            Object.keys(datos.secciones).forEach((key) =>{ 
              infoTarjetas.data?.forEach(datoTarjeta => {
                if(datoTarjeta.codSeccion==datos.secciones[key].codSeccion){ //Si coinciden en codigo de sección
                  datos.secciones[datos.secciones[key].nombre]['tarjetas'][datoTarjeta.codTarjeta]=datoTarjeta; //Asignamos la tarjeta a la sección
                }
              });
            });
            resolve(datos);
          })
        })
      })
    })
  }
}




