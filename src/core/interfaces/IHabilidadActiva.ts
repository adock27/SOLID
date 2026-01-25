import { IHabilidad } from "./IHabilidad";

export interface IHabilidadActiva extends IHabilidad {
    ejecutar(): void; // Solo las activas tienen esto
}