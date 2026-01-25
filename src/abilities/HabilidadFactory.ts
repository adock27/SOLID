// src/abilities/HabilidadFactory.ts
import { IHabilidadActiva } from '../core/interfaces/IHabilidadActiva.js';
import { IHabilidadPasiva } from '../core/interfaces/IHabilidadPasiva.js';
import { HechizoFuego } from './HechizoFuego.js';
import { Curacion } from './Curacion';
import { AtaqueEspada } from './AtaqueEspada.js';
import { PielDeRoble } from './PielDeRoble.js';

export type TipoActiva = 'FUEGO' | 'ESPADA' | 'CURACION';
export type TipoPasiva = 'ROBLE';

export class HabilidadFactory {
    static crearActiva(tipo: TipoActiva): IHabilidadActiva {
        switch (tipo) {
            case 'FUEGO': return new HechizoFuego();
            case 'ESPADA': return new AtaqueEspada();
            case 'CURACION': return new Curacion(); // Assuming AtaqueEspada is used for curative purposes
            default: throw new Error("Activa no encontrada");
        }
    }

    static crearPasiva(tipo: TipoPasiva): IHabilidadPasiva {
        switch (tipo) {
            case 'ROBLE': return new PielDeRoble();
            default: throw new Error("Pasiva no encontrada");
        }
    }
}