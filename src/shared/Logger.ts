// src/shared/Logger.ts

export class Logger {
  static info(mensaje: string): void {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[LOG ${timestamp}] INFO: ${mensaje}`);
  }

  static combate(entidad: string, accion: string): void {
    console.log(`%c[COMBATE] ${entidad}: ${accion}`, "color: yellow; font-weight: bold;");
  }

  static error(mensaje: string): void {
    console.error(`[ERROR]: ${mensaje}`);
  }
}