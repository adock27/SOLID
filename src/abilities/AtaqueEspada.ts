import { IHabilidad } from '../core/interfaces/IHabilidad.js';
import { Logger } from '../shared/Logger.js';
export class AtaqueEspada implements IHabilidad {
  nombre = "Mandoble de Hierro";
  ejecutar(): void {
    Logger.info("⚔️  ¡Realiza un tajo circular que golpea a todos los enemigos!");
  }
}