import { HeroeFactory } from './factories/HeroeFactory.js';
import { HabilidadFactory } from './factories/HabilidadFactory.js';

// Import concrete entities
import { Guerrero } from './entities/Guerrero.js';
import { Tanque } from './entities/Tanque.js';
import { Mago } from './entities/Mago.js';

// Import concrete abilities
import { HechizoFuego } from '../abilities/HechizoFuego.js';
import { AtaqueEspada } from '../abilities/AtaqueEspada.js';
import { HechizoRayo } from '../abilities/HechizoRayo.js';
import { Curacion } from '../abilities/Curacion.js';
import { PielDeRoble } from '../abilities/PielDeRoble.js';
import { CascoDiamante } from '../abilities/CascoDiamante.js';

export function initRegistry() {
    // Register Heroes
    HeroeFactory.registrar('GUERRERO', Guerrero);
    HeroeFactory.registrar('TANQUE', Tanque);
    HeroeFactory.registrar('MAGO', Mago);

    // Register Active Abilities
    HabilidadFactory.registrarActiva('FUEGO', HechizoFuego);
    HabilidadFactory.registrarActiva('ESPADA', AtaqueEspada);
    HabilidadFactory.registrarActiva('RAYO', HechizoRayo);
    HabilidadFactory.registrarActiva('CURACION', Curacion);

    // Register Passive Abilities
    HabilidadFactory.registrarPasiva('ROBLE', PielDeRoble);
    HabilidadFactory.registrarPasiva('CASCO_DIAMANTE', CascoDiamante);
}
