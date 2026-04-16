import { Heroe } from './Heroe.js';
import { Logger } from '../../shared/Logger.js';

export class Guerrero extends Heroe {
    constructor(nombre: string) {
        super(nombre);
        this.salud = 1200; // Un poco más que el base
        this.defensa = 20;
        this.energia = 150;
        this.magia = 50;
    }

    init(): void {
        super.init();
        Logger.info(`⚔️ [${this.nombre}] ¡Un Guerrero se ha unido a la lucha!`);
    }
}
