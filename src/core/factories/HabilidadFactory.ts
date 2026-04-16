import { IHabilidadActiva } from '../interfaces/IHabilidadActiva.js';
import { IHabilidadPasiva } from '../interfaces/IHabilidadPasiva.js';

export type ActivaConstructor = new () => IHabilidadActiva;
export type PasivaConstructor = new () => IHabilidadPasiva;

export class HabilidadFactory {
    private static activaRegistry = new Map<string, ActivaConstructor>();
    private static pasivaRegistry = new Map<string, PasivaConstructor>();

    static registrarActiva(tipo: string, constructor: ActivaConstructor) {
        this.activaRegistry.set(tipo, constructor);
    }

    static registrarPasiva(tipo: string, constructor: PasivaConstructor) {
        this.pasivaRegistry.set(tipo, constructor);
    }

    static crearActiva(tipo: string): IHabilidadActiva {
        const Constructor = this.activaRegistry.get(tipo);
        if (!Constructor) {
            throw new Error(`Habilidad activa desconocida: ${tipo}. Asegúrate de haberla registrado.`);
        }
        return new Constructor();
    }

    static crearPasiva(tipo: string): IHabilidadPasiva {
        const Constructor = this.pasivaRegistry.get(tipo);
        if (!Constructor) {
            throw new Error(`Habilidad pasiva desconocida: ${tipo}. Asegúrate de haberla registrado.`);
        }
        return new Constructor();
    }
}
