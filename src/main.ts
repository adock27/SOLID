import { Heroe } from './core/entities/Heroe.js';
import { AtaqueEspada } from './abilities/AtaqueEspada.js';
import { HechizoFuego } from './abilities/HechizoFuego.js';
import { PielDeRoble } from './abilities/PielDeRoble.js';



// 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
const geralt = new Heroe("Geralt");
const ander = new Heroe("Ander");

// 3. Ejecución
console.log("--- INICIO DEL COMBATE ---");
geralt.init();
ander.init();

geralt.setHabilidadActiva(new AtaqueEspada());
geralt.actuar();

ander.setHabilidadActiva(new HechizoFuego());
ander.setHabilidadPasiva(new PielDeRoble());
ander.actuar();


console.log("--- FIN DEL COMBATE ---");