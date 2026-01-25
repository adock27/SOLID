// src/abilities/HechizoFuego.ts
import { IHabilidad } from '../core/interfaces/IHabilidad.js';

export class HechizoFuego implements IHabilidad {
  nombre = "Bola de Fuego";
  ejecutar() {
    console.log("🔥 ¡Una explosión ardiente consume al enemigo!");
  }
}

// src/abilities/AtaqueEspada.ts
export class AtaqueEspada implements IHabilidad {
  nombre = "Corte de Acero";
  ejecutar() {
    console.log("⚔️ ¡Un tajo rápido y preciso!");
  }
}