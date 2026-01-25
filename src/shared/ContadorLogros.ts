// src/shared/ContadorLogros.ts
import { IObservador } from '../core/interfaces/IObservador.js';
import { Logger } from './Logger.js';

export class ContadorLogros implements IObservador {
  private conteoHabilidades: Map<string, number> = new Map();

  notificar(evento: string, nombreHabilidad: string): void {
    if (evento === 'HABILIDAD_USADA') {
      const actual = this.conteoHabilidades.get(nombreHabilidad) || 0;
      this.conteoHabilidades.set(nombreHabilidad, actual + 1);
      
      Logger.info(`🏆 LOGRO: ${nombreHabilidad} usado ${actual + 1} veces.`);
    }
  }
}