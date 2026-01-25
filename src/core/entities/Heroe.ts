import { IHabilidad } from '../interfaces/IHabilidad.js';

export class Heroe {
  constructor(
    public nombre: string,
    private habilidad: IHabilidad // Inyección de dependencia
  ) {}

  // Permite cambiar comportamiento sin modificar la clase
  setHabilidad(nuevaHabilidad: IHabilidad): void {
    console.log(`\n[Sistema]: ${this.nombre} ha equipado: ${nuevaHabilidad.nombre}`);
    this.habilidad = nuevaHabilidad;
  }

  actuar(): void {
    console.log(`[Acción]: ${this.nombre} se prepara...`);
    this.habilidad.ejecutar();
  }
}