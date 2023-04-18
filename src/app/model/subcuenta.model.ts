import { Pais } from "./pais.model";

export class Subcuenta {
/**DEFINIR BIEN ESTA CLASE */

    public id!: number;
    public descripcion!: string;
    public activo!: boolean;
    public fechaUltimaModificacion!: Date;
    public usuarioUltimaModificacion!: string;
  
    constructor(data?: any) {
      if (data) {
        this.id = data.idSubcuenta;
        this.descripcion = data.descripcion;
        this.activo = data.activo;
        this.fechaUltimaModificacion != data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
        this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
      }
    }
  
    public getFullDescription(): string {
      return `${this.descripcion}`;
    }
}
