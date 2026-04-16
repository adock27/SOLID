import { IHabilidadFisica } from '../core/interfaces/IHabilidadFisica.js';
import { Logger } from '../shared/Logger.js';
import { Heroe } from '../core/entities/Heroe.js';

export class AtaqueEspada implements IHabilidadFisica {
  nombre = "Mandoble de Hierro";
  costeEnergia = 10;
  damage = 60;

  ejecutar(lanzador: Heroe, objetivo?: Heroe): void {
    Logger.info(`⚔️ [${lanzador.nombre}] blande su ESPADA con fuerza`);
    lanzador.consumirEnergia(this.costeEnergia);

    if (objetivo) {
      Logger.info(`💢 Un corte profundo impacta en ${objetivo.nombre}`);
      objetivo.recibirDamage(this.damage);
    }
  }
}