import { IHabilidad } from "./IHabilidad";

export interface IHabilidadActiva extends IHabilidad {
    damage: number;
    ejecutar(): void; // Solo las activas tienen esto
}