import { IHabilidadFisica } from '../core/interfaces/IHabilidadFisica.js';
import { Logger } from '../shared/Logger.js';

export class AtaqueEspada implements IHabilidadFisica {
  nombre = "Mandoble de Hierro";
  costeEnergia = 5;
  damage = 800;
  ejecutar(): void {}
}