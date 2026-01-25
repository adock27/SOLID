import { IHabilidad } from "./IHabilidad";

export interface IHabilidadMagica extends IHabilidad {
    costeMana: number;
}
// El Type Guard vive aquí mismo
export function esHabilidadMagica(h: IHabilidad): h is IHabilidadMagica {
    return (h as IHabilidadMagica).costeMana !== undefined;
}