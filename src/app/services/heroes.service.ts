import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';
import  {dataBaseUrl} from '../conf/config';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // EndPoint del Firebase de nuestra coleccion
  private url = dataBaseUrl.endpoint;

  constructor(private http: HttpClient) { }

  //Metodo para crear el Heroe
  crearHeroe(heroe:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe)
               .pipe(
                 map( (resp: any) => {
                   heroe.id = resp.name;
                   return heroe;
                 })
               );
  }

  //Metodo para actualizar el Heroe
  actualizarHeroe(heroe:HeroeModel){

    const heroeTemp = {
      // El spread se encarga de mandar todas la prpiedades de heroe
      // sin necesidad de escribir todas una a una
      ...heroe
    }

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

    // Metodo para borrar el heroe seleccionado
    borrarHeroe(id:string){
      return this.http.delete(`${this.url}/heroes/${id}.json`)
    }

  // Metodo para editar el heroe obtenido
  getHeroeById(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  // Metodo para obtener el listado de todos los heroes creados
  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
               .pipe(
                 map( resp => this.crearArray(resp)),
                 delay(500)
               );
  }
  // Logica para mostrar el objeto de heroes recibido en el 'resp'
  // del map y devolverlo transofrmado en un Array para mostrar
  // en pantalla
  private crearArray( heroesObj: object ){

    const heroes: HeroeModel[]=[];

    if(heroesObj === null){
      return [];
    }

    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      // Devolvemos en el Array el objeto extraido
      heroes.push(heroe);

    });

    return heroes;
  }

}
