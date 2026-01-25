import { IHabilidad } from '../core/interfaces/IHabilidad.js';
import { Logger } from '../shared/Logger.js';
export class Curacion implements IHabilidad {
  nombre = "Curación Mágica";
  puntosSalud = 150;
  ejecutar(): void {
    Logger.info("✨ ¡Restaura la salud de todos los aliados!");
  }
}