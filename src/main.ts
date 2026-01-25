import { Heroe } from './core/entities/Heroe.js';
import { HabilidadFactory } from './abilities/HabilidadFactory.js';
import { ContadorLogros } from './shared/ContadorLogros.js';

const sistemaLogros = new ContadorLogros();

// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const geralt = new Heroe("Geralt");
const ander = new Heroe("Ander");
geralt.agregarObservador(sistemaLogros);
ander.agregarObservador(sistemaLogros);

// 3. Ejecución
console.log("--- INICIO DEL COMBATE ---");
geralt.init();
ander.init();

geralt.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
geralt.actuar();

ander.setHabilidadActiva(HabilidadFactory.crearActiva('FUEGO'));
ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
ander.actuar();

geralt.mosrarEstado();
ander.mosrarEstado();


console.log("--- FIN DEL COMBATE ---");