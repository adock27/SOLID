import { IHabilidadMagica } from '../core/interfaces/IHabilidadMagica.js';
import { Logger } from '../shared/Logger.js';
import { Heroe } from '../core/entities/Heroe.js';

export class HechizoRayo implements IHabilidadMagica {
    nombre = "Rayo Fulminante";
    costeMana = 30;
    damage = 80;

    ejecutar(lanzador: Heroe, objetivo?: Heroe): void {
        Logger.info(`⚡ [${lanzador.nombre}] invoca un RAYO del cielo`);
        lanzador.consumirMana(this.costeMana);

        if (objetivo) {
            Logger.info(`💥 ¡CRACK! El rayo golpea directamente a ${objetivo.nombre}`);
            objetivo.recibirDamage(this.damage);
        }
    }
}