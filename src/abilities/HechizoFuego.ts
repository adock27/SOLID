import { IHabilidad } from '../core/interfaces/IHabilidad.js';

export class HechizoFuego implements IHabilidad {
  nombre = "Bola de Fuego";
  ejecutar(): void {
    console.log("🔥 ¡Lanza una esfera ardiente que explota al impactar!");
  }
}