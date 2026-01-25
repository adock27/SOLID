import { IHabilidad } from './IHabilidad';
export interface IHabilidadCurativa extends IHabilidad {
    puntosSalud: number;
}

export function esHabilidadCurativa(h: IHabilidad): h is IHabilidadCurativa {
    return (h as IHabilidadCurativa).puntosSalud !== undefined;
}