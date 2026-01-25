// src/core/interfaces/IObservador.ts
export interface IObservador {
  notificar(evento: string, datos: any): void;
}