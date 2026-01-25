import { IHabilidad } from '../interfaces/IHabilidad.js';
import { Logger } from '../../shared/Logger.js';
import { esHabilidadMagica } from '../interfaces/IHabilidadMagica.js';
import { esHabilidadFisica } from '../interfaces/IHabilidadFisica.js';
import { IHabilidadActiva } from '../interfaces/IHabilidadActiva.js';
import { IHabilidadPasiva } from '../interfaces/IHabilidadPasiva.js';
import { IObservador } from '../interfaces/IObservador.js';

export class Heroe {
  private observadores: IObservador[] = [];
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

  agregarObservador(obs: IObservador): void {
    this.observadores.push(obs);
  }

  private emitir(evento: string, datos: any): void {
    this.observadores.forEach(obs => obs.notificar(evento, datos));
  }


  setHabilidadActiva(nuevaHabilidad: IHabilidadActiva): void {
    Logger.info(`[${this.nombre}] ha equipado el ataque activo: ${nuevaHabilidad.nombre}`);
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
      this.emitir('HABILIDAD_USADA', this.slotActivo.nombre);
    } else {
      Logger.info(`[${this.nombre}] no tiene ataques listos.`);
    }
  }

  mosrarEstado(): void {
    Logger.info(`--- Estado de [${this.nombre}] ---`);
    Logger.info(`Defensa: ${this.defensaBase + (this.slotPasivo ? this.slotPasivo.bonoDefensa : 0)}`);
    Logger.info(`Magia: ${this.magia}`);
    Logger.info(`Energía: ${this.energia}`);
    Logger.info('--------------------------\n');
  }


}