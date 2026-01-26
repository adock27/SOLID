import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { Logger } from '../shared/Logger.js';
export class Curacion implements IHabilidadMagica {
  nombre = "Curación Mágica";
  damage: 0;
  puntosSalud = 150;
  costeMana = 20;
  ejecutar(): void {
    Logger.info("✨ ¡Restablece 150 puntos de salud!");
  }
}