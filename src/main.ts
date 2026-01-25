import { Heroe } from './core/entities/Heroe.js';
import { AtaqueEspada } from './abilities/AtaqueEspada.js';
import { HechizoFuego } from './abilities/HechizoFuego.js';

// 1. Creamos las habilidades (Instancias concretas)
const espada = new AtaqueEspada();
const fuego = new HechizoFuego();

// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const geralt = new Heroe("Geralt");
const ander = new Heroe("Ander");

// 3. Ejecución
console.log("--- INICIO DEL COMBATE ---");
geralt.init();
ander.init();

geralt.setHabilidad(espada);
geralt.actuar();

ander.setHabilidad(fuego);
ander.actuar();


console.log("--- FIN DEL COMBATE ---");