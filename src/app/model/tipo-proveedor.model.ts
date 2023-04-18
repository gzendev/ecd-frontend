import { Pais } from "./pais.model";


export class TipoProveedor {

  public id!: number;
  public pais!: Pais;
  public descripcion!: string;
  public fechaUltimaModificacion!: Date;
  public usuarioUltimaModificacion!: string;
  public activo!: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.pais  = data.pais;
      this.descripcion = data.descripcion;
      this.fechaUltimaModificacion != data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
      this.activo = data.activo;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
