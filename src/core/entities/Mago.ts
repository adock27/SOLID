import { Heroe } from './Heroe.js';
import { Logger } from '../../shared/Logger.js';

export class Mago extends Heroe {
    constructor(nombre: string) {
        super(nombre);
        this.salud = 800;    // Menos salud
        this.defensa = 10;   // Menos defensa
        this.energia = 80;
        this.magia = 300;    // Mucha magia
    }

    init(): void {
        super.init();
        Logger.info(`🔮 [${this.nombre}] ¡Un Mago ha aparecido entre las sombras!`);
    }

    // El mago podría recuperar magia al actuar (ejemplo de especialización)
    actuar(objetivo?: Heroe): void {
        super.actuar(objetivo);
        this.magia += 5; 
        Logger.info(`✨ [${this.nombre}] canaliza energía y recupera 5 de maná.`);
    }
}
