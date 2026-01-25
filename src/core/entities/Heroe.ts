import { IHabilidad } from '../interfaces/IHabilidad.js';
import { Logger } from '../../shared/Logger.js';

export class Heroe {
  // Ponemos el signo '?' para indicar que puede ser undefined
  private habilidad?: IHabilidad;
  constructor(
    public nombre: string
  ) { }

  // Permite cambiar comportamiento sin modificar la clase
  setHabilidad(nuevaHabilidad: IHabilidad): void {
    Logger.info(`${this.nombre} ha equipado ${nuevaHabilidad.nombre}`);
    this.habilidad = nuevaHabilidad;
  }

  actuar(): void {
    if (!this.habilidad) {
      Logger.info(`${this.nombre} no tiene habilidades equipadas.`);
      return;
    }
    this.habilidad.ejecutar();
  }
}