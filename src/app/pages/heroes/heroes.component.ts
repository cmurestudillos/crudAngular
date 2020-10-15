import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  year = new Date().getFullYear();

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {

    this.cargando = true;

    this.heroesService.getHeroes()
        .subscribe(resp => {
          this.heroes = resp
          this.cargando = false;
        });
  }

  borrarHeroe(heroe: HeroeModel, ind: number){
    // Verificar que va a eliminar el registro
    Swal.fire({
      title:'¿Esta seguro de querer eliminar el registro?',
      text: `Va a borrar a ${ heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if(resp.value){
        this.heroesService.borrarHeroe(heroe.id)
        .subscribe(resp => this.heroes.splice(ind, 1) );
      }
    });
  }

}
