import { Heroe } from './core/entities/Heroe.js';
import { HabilidadFactory } from './abilities/HabilidadFactory.js';
import { ContadorLogros } from './shared/ContadorLogros.js';

const sistemaLogros = new ContadorLogros();

// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const geralt = new Heroe("Geralt");
const ander = new Heroe("Ander");
geralt.agregarObservador(sistemaLogros);
ander.agregarObservador(sistemaLogros);

console.log("--- INICIO DEL COMBATE ---");
// 3. Ejecución
geralt.init();
ander.init();

geralt.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
geralt.actuar(ander);

ander.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
ander.actuar();
ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('CURACION'));
ander.actuar(geralt);
ander.actuar(geralt);

geralt.mostrarEstado();
ander.mostrarEstado();


console.log("--- FIN DEL COMBATE ---");