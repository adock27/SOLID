import { IHabilidad } from '../interfaces/IHabilidad.js';
import { Logger } from '../../shared/Logger.js';
import { esHabilidadMagica } from '../interfaces/IHabilidadMagica.js';
import { esHabilidadFisica } from '../interfaces/IHabilidadFisica.js';
import { IHabilidadActiva } from '../interfaces/IHabilidadActiva.js';
import { IHabilidadPasiva } from '../interfaces/IHabilidadPasiva.js';

export class Heroe {
  private defensaBase: number = 80;
  private magia: number = 100;
  private energia: number = 100;
  private habilidad?: IHabilidad;
  private slotActivo?: IHabilidadActiva;
  private slotPasivo?: IHabilidadPasiva;
  constructor(
    public nombre: string
  ) { }

  init(): void {
    Logger.info(`¡[${this.nombre}] El héroe, ha entrado en la batalla!`);
  }

  // Permite cambiar comportamiento sin modificar la clase
  setHabilidad(nuevaHabilidad: IHabilidad): void {
    Logger.info(`[${this.nombre}] ha equipado ${nuevaHabilidad.nombre}`);
    this.habilidad = nuevaHabilidad;
  }

  setHabilidadActiva(nuevaHabilidad: IHabilidadActiva): void {
    Logger.info(`[${this.nombre}] ha equipado el ataque: ${nuevaHabilidad.nombre}`);
    this.slotActivo = nuevaHabilidad;
  }

  setHabilidadPasiva(nuevaHabilidad: IHabilidadPasiva): void {
    Logger.info(`[${this.nombre}] ha equipado habilidad pasiva: ${nuevaHabilidad.nombre} \n(+${nuevaHabilidad.bonoDefensa} defensa)`);
    this.slotPasivo = nuevaHabilidad;
  }

  actuar(): void {

    if (this.slotActivo) {
      if (esHabilidadMagica(this.slotActivo)) {
        this.magia -= this.slotActivo.costeMana;
      }

      if (esHabilidadFisica(this.slotActivo)) {
        this.energia -= this.slotActivo.costeEnergia;
      }

      this.slotActivo.ejecutar();
    } else {
      Logger.info(`[${this.nombre}] no tiene ataques listos.`);
    }
  }


}