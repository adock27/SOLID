// src/abilities/PielDeRoble.ts

import { IHabilidadPasiva } from "../core/interfaces/IHabilidadPasiva";


export class CascoDiamante implements IHabilidadPasiva {
  nombre = "Casco de diamante";
  efectoPermanente = "Proteccion valiosa para tu cabeza";
  bonoDefensa = 300;
}