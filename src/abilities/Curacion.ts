import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { Logger } from '../shared/Logger.js';
import { Heroe } from '../core/entities/Heroe.js';

export class Curacion implements IHabilidadMagica {
  nombre = "Plegaria de Sanación";
  damage = 0;
  puntosSalud = 200;
  costeMana = 30;

  ejecutar(lanzador: Heroe, objetivo?: Heroe): void {
    Logger.info(`✨ [${lanzador.nombre}] entona una plegaria sagrada`);
    lanzador.consumirMana(this.costeMana);
    lanzador.sanar(this.puntosSalud);
  }
}