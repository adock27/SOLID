import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { Logger } from '../shared/Logger.js';
import { Heroe } from '../core/entities/Heroe.js';

export class HechizoFuego implements IHabilidadMagica {
  nombre = "Bola de Fuego";
  costeMana = 15;
  damage = 40;

  ejecutar(lanzador: Heroe, objetivo?: Heroe): void {
    Logger.info(`🔥 [${lanzador.nombre}] lanza una BRUTAL BOLA DE FUEGO`);
    lanzador.consumirMana(this.costeMana);

    if (objetivo) {
      Logger.info(`⚔️ El fuego envuelve a ${objetivo.nombre}`);
      objetivo.recibirDamage(this.damage);
    }
  }
}