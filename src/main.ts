import { Heroe } from './core/entities/Heroe.js';
import { PielDeRoble } from './abilities/PielDeRoble.js';
import { HabilidadFactory } from './abilities/HabilidadFactory.js';



// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const geralt = new Heroe("Geralt");
const ander = new Heroe("Ander");

// 3. Ejecución
console.log("--- INICIO DEL COMBATE ---");
geralt.init();
ander.init();

geralt.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
geralt.actuar();

ander.setHabilidadActiva(HabilidadFactory.crearActiva('FUEGO'));
ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
ander.actuar();


console.log("--- FIN DEL COMBATE ---");