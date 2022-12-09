import { Seccion } from "./Seccion";

export interface Usuario {
  id: String;
  codusu: number;
  nombre: String;
  apellidos: String;
  fechaNacimiento: Date;
  nombreSobreMi: String;
  sobreMi: String;
  email:String
  descripcion:String;
  telefono: String;  
  direccion: String;
  imgurl:string;
  secciones:  { [key: string]: any };
  }