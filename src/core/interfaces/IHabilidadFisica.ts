import { IHabilidad } from "./IHabilidad";

export interface IHabilidadFisica extends IHabilidad{
    costeEnergia: number;
}
export function esHabilidadFisica(h: IHabilidad): h is IHabilidadFisica {
    return (h as IHabilidadFisica).costeEnergia !== undefined;
}