import { Heroe } from './core/entities/Heroe.js';
import { HabilidadFactory } from './abilities/HabilidadFactory.js';
import { ContadorLogros } from './shared/ContadorLogros.js';

const sistemaLogros = new ContadorLogros();

// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const geralt = new Heroe("Geralt");
const ander = new Heroe("Ander");
const breitner = new Heroe("Breitner");

geralt.agregarObservador(sistemaLogros);
ander.agregarObservador(sistemaLogros);
breitner.agregarObservador(sistemaLogros);

console.log("--- INICIO DEL COMBATE ---");
// 3. Ejecución
// geralt.init();
ander.init();
breitner.init();


breitner.mostrarEstado();
ander.mostrarEstado();

ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
ander.mostrarEstado();

breitner.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
breitner.actuar(ander)

breitner.setHabilidadPasiva(HabilidadFactory.crearPasiva('CASCO_DIAMANTE'));
breitner.mostrarEstado();
breitner.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
breitner.actuar(ander)

ander.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
ander.actuar(breitner);
ander.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
ander.actuar(breitner);
ander.setHabilidadActiva(HabilidadFactory.crearActiva('FUEGO'));
ander.actuar(breitner);




// geralt.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
// geralt.actuar(ander);
// ander.setHabilidadActiva(HabilidadFactory.crearActiva('CURACION'));
// ander.actuar(geralt);
// geralt.actuar(ander);

// ander.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
// ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
// ander.actuar(geralt);
// ander.actuar(geralt);

breitner.mostrarEstado();
ander.mostrarEstado();


console.log("--- FIN DEL COMBATE ---");