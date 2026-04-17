import { IHabilidad } from '../interfaces/IHabilidad.js';
import { Logger } from '../../shared/Logger.js';
import { esHabilidadMagica } from '../interfaces/IHabilidadMagica.js';
import { esHabilidadFisica } from '../interfaces/IHabilidadFisica.js';
import { IHabilidadActiva } from '../interfaces/IHabilidadActiva.js';
import { IHabilidadPasiva } from '../interfaces/IHabilidadPasiva.js';
import { IObservador } from '../interfaces/IObservador.js';
import { esHabilidadCurativa } from '../interfaces/IHabilidadCurativa.js';

export abstract class Heroe {
  private observadores: IObservador[] = [];
  protected defensa: number = 0;
  protected salud: number = 1000;
  protected magia: number = 100;
  protected energia: number = 100;
  private slotActivo?: IHabilidadActiva;
  private slotPasivo?: IHabilidadPasiva;

  constructor(
    public nombre: string
  ) { }

  init(): void {
    Logger.info(`[${this.nombre}] El héroe, ha entrado en la batalla`);
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

  actuar(objetivo?: Heroe): void {
    if (this.slotActivo) {
      this.slotActivo.ejecutar(this, objetivo);
      this.emitir('HABILIDAD_USADA', this.slotActivo.nombre);
    } else {
      Logger.info(`[${this.nombre}] no tiene ataques listos.`);
    }
  }

  consumirMana(cantidad: number): void {
    this.magia -= cantidad;
    if (this.magia < 0) this.magia = 0;
  }

  consumirEnergia(cantidad: number): void {
    this.energia -= cantidad;
    if (this.energia < 0) this.energia = 0;
  }

  sanar(cantidad: number): void {
    this.salud += cantidad;
    Logger.info(`💚 ${this.nombre} se ha curado ${cantidad} puntos. Salud: ${this.salud.toFixed(2)}`);
  }

  recibirDamage(cantidad: number): void {
    const defensaTotal = this.defensa + (this.slotPasivo?.bonoDefensa ?? 0);

    const danoReal = cantidad * (100 / (100 + defensaTotal));

    this.salud -= danoReal;

    Logger.info(`💥 ${this.nombre} recibió ${danoReal.toFixed(2)} de daño. Salud restante: ${this.salud.toFixed(2)}`);

    if (this.salud < 0) this.salud = 0;

    if (this.salud === 0) {
      Logger.info(`💀 ${this.nombre} ha caído en combate.`);
    }
  }

  mostrarEstado(): void {
    Logger.info(`--- Estado de [${this.nombre}] ---\n
      Salud: ${this.salud}\n
      Defensa: ${this.defensa + (this.slotPasivo ? this.slotPasivo.bonoDefensa : 0)}\n
      Magia: ${this.magia}\n
      Energía: ${this.energia}\n
      slotActivo: ${this.slotActivo?.nombre}\n
      slotPasivo: ${this.slotPasivo?.nombre}\n
    `);
  }

  getEstado() {
    return {
      nombre: this.nombre,
      salud: this.salud,
      maxSalud: 1000,
      magia: this.magia,
      energia: this.energia,
      defensa: this.defensa,
      habilidadActiva: this.slotActivo?.nombre,
      habilidadPasiva: this.slotPasivo?.nombre,
      defensaTotal: this.defensa + (this.slotPasivo?.bonoDefensa ?? 0)
    };
  }


}