import { Heroe } from '../entities/Heroe.js';

export type HeroeConstructor = new (nombre: string) => Heroe;

export class HeroeFactory {
    private static registry = new Map<string, HeroeConstructor>();

    static registrar(tipo: string, constructor: HeroeConstructor) {
        this.registry.set(tipo, constructor);
    }

    static crearHeroe(tipo: string, nombre: string): Heroe {
        const Constructor = this.registry.get(tipo);
        if (!Constructor) {
            throw new Error(`Tipo de héroe desconocido: ${tipo}. Asegúrate de haberlo registrado en el bootstrapper.`);
        }
        return new Constructor(nombre);
    }
}
