import { IHabilidad } from "./IHabilidad";
import { Heroe } from "../entities/Heroe.js";

export interface IHabilidadActiva extends IHabilidad {
    damage: number;
    ejecutar(lanzador: Heroe, objetivo?: Heroe): void; 
}