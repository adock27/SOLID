import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { Logger } from '../shared/Logger.js';

export class HechizoFuego implements IHabilidadMagica {
  nombre = "Bola de Fuego";
  costeMana = 10;
  damage = 500;
  ejecutar(): void {
    Logger.info(`🔥 Lanzando fuego (Gasto: ${this.costeMana} de maná)`);
  }
}