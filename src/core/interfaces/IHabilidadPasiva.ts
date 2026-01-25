import { IHabilidad } from "./IHabilidad";

export interface IHabilidadPasiva extends IHabilidad {
    nombre: string;
    efectoPermanente: string;
    bonoDefensa: number;
}