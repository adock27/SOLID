import { IHabilidad } from '../core/interfaces/IHabilidad.js';
import { Logger } from '../shared/Logger.js';
export class HechizoFuego implements IHabilidad {
  nombre = "Bola de Fuego";
  ejecutar(): void {
    Logger.info("🔥 ¡Lanzando explosión ardiente!");
  }
}