// src/abilities/PielDeRoble.ts

import { IHabilidadPasiva } from "../core/interfaces/IHabilidadPasiva";


export class PielDeRoble implements IHabilidadPasiva {
  nombre = "Piel de Roble";
  efectoPermanente = "Endurece la piel como madera.";
  bonoDefensa = 100;
}