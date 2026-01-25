import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { Logger } from '../shared/Logger.js';

export class HechizoRayo implements IHabilidadMagica {
    nombre = "Rayo";
    costeMana = 50;
    damage = 400;
    ejecutar(): void {
        Logger.info(`Lanzando rayo (Gasto: ${this.costeMana} de maná)`);
    }
}