import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { IHabilidadPasiva } from '../core/interfaces/IHabilidadPasiva.js';
import { Logger } from '../shared/Logger.js';
export class Curacion implements IHabilidadMagica, IHabilidadPasiva {
  nombre = "Curación Mágica";
  efectoPermanente = "Aumenta la regeneración de salud en combate.";
  bonoDefensa = 0;
  puntosSalud = 150;
  costeMana = 20;
  ejecutar(): void {
    Logger.info("✨ ¡Restablece 150 puntos de salud!");
  }
}