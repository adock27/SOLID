// src/abilities/HabilidadFactory.ts
import { IHabilidadActiva } from '../core/interfaces/IHabilidadActiva.js';
import { IHabilidadPasiva } from '../core/interfaces/IHabilidadPasiva.js';
import { HechizoFuego } from './HechizoFuego.js';
import { Curacion } from './Curacion';
import { AtaqueEspada } from './AtaqueEspada.js';
import { PielDeRoble } from './PielDeRoble.js';
import { HechizoRayo } from './HechizoRayo.js';
import { CascoDiamante } from './CascoDiamante.js';

export type TipoActiva = 'FUEGO' | 'ESPADA' | 'RAYO' | 'CURACION';
export type TipoPasiva = 'ROBLE' | 'CASCO_DIAMANTE';

export class HabilidadFactory {
    static crearActiva(tipo: TipoActiva): IHabilidadActiva {
        switch (tipo) {
            case 'FUEGO': return new HechizoFuego();
            case 'ESPADA': return new AtaqueEspada();
            case 'RAYO': return new HechizoRayo();
            case 'CURACION': return new Curacion();
            default: throw new Error("Activa no encontrada");
        }
    }

    static crearPasiva(tipo: TipoPasiva): IHabilidadPasiva {
        switch (tipo) {
            case 'ROBLE': return new PielDeRoble();
            case 'CASCO_DIAMANTE': return new CascoDiamante();
            default: throw new Error("Pasiva no encontrada");
        }
    }
}