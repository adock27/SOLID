import { Heroe } from './core/entities/Heroe.js';
import { AtaqueEspada } from './abilities/AtaqueEspada.js';
import { HechizoFuego } from './abilities/HechizoFuego.js';

// 1. Creamos las habilidades (Instancias concretas)
const espada = new AtaqueEspada();
const fuego = new HechizoFuego();

// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const miHeroe = new Heroe("Geralt", espada);

// 3. Ejecución
console.log("--- INICIO DEL COMBATE ---");
miHeroe.actuar();

// 4. Cambiamos el comportamiento en caliente (Liskov Substitution / Open-Closed)
miHeroe.setHabilidad(fuego);
miHeroe.actuar();