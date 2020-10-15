import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// Importamos la interfaz de Heroe
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
// Importamos el Sweetalert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Obtenemos el ID de la url para luego llamar a nuestro servicio
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo'){
      this.heroesService.getHeroeById(id)
          .subscribe((resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
      });
    }

  }

  // Metodo para guardar el heroe
  guardar(form: NgForm){

    let peticion: Observable<any>;

    if(form.invalid){
      console.log('Formulario no valido.')
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    // Si el id de heroe esta relleno, actualizamos, sino escribimos
    if (this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }else{
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    // cuando la peticion se resuelva, cerramos el Swal
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });

  }

}
