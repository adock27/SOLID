// Personaje.ts
import { IHabilidad } from '../interfaces/IHabilidad';

export class Heroe {
  constructor(
    public nombre: string,
    private habilidad: IHabilidad // Depende de la abstracción
  ) {}

  setHabilidad(nuevaHabilidad: IHabilidad) {
    this.habilidad = nuevaHabilidad;
  }

  actuar() {
    this.habilidad.ejecutar();
  }
}