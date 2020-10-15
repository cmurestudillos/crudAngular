export class HeroeModel{
  id: string;
  nombre: string;
  poder: string;
  estado: boolean;

  constructor(){
    // Inicializamos el estado a "vivo"
    this.estado = true;
  }
}
