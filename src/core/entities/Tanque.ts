import { Heroe } from './Heroe.js';
import { Logger } from '../../shared/Logger.js';

export class Tanque extends Heroe {
    constructor(nombre: string) {
        super(nombre);
        this.salud = 2500;   // Mucha vida
        this.defensa = 80;   // Mucha defensa
        this.energia = 100;
        this.magia = 20;     // Poca magia
    }

    init(): void {
        super.init();
        Logger.info(`🛡️ [${this.nombre}] ¡Un Tanque ha llegado para proteger a su equipo!`);
    }

    // Ejemplo de cómo podríamos especializar comportamientos
    recibirDamage(cantidad: number): void {
        Logger.info(`🛡️ [${this.nombre}] bloquea parte del impacto con su escudo.`);
        super.recibirDamage(cantidad);
    }
}
