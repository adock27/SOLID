import { Heroe } from './core/entities/Heroe.js';
import { AtaqueEspada } from './abilities/AtaqueEspada.js';
import { HechizoFuego } from './abilities/HechizoFuego.js';

// Instanciamos las dependencias
const espada = new AtaqueEspada();
const fuego = new HechizoFuego();

// Inyectamos la dependencia inicial
const miHeroe = new Heroe("Arturo", espada);

miHeroe.realizarAccion();

// Cambiamos el comportamiento dinámicamente
miHeroe.setHabilidad(fuego);
miHeroe.realizarAccion();