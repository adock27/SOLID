import { IHabilidad } from '../core/interfaces/IHabilidad.js';

export class AtaqueEspada implements IHabilidad {
  nombre = "Mandoble de Hierro";
  ejecutar(): void {
    console.log("⚔️  ¡Realiza un tajo circular que golpea a todos los enemigos!");
  }
}