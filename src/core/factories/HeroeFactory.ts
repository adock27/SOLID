import { Heroe } from '../entities/Heroe.js';
import { Guerrero } from '../entities/Guerrero.js';
import { Tanque } from '../entities/Tanque.js';
import { Mago } from '../entities/Mago.js';

export type TipoHeroe = 'GUERRERO' | 'TANQUE' | 'MAGO';

export class HeroeFactory {
    static crearHeroe(tipo: TipoHeroe, nombre: string): Heroe {
        switch (tipo) {
            case 'GUERRERO':
                return new Guerrero(nombre);
            case 'TANQUE':
                return new Tanque(nombre);
            case 'MAGO':
                return new Mago(nombre);
            default:
                throw new Error(`Tipo de héroe desconocido: ${tipo}`);
        }
    }
}
