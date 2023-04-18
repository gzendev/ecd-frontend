import { Pais } from "./pais.model";

export class EstadoLegajo {
    public id !: number;
    public pais!: Pais;
    public idPais!: number;
    public descripcion !: string;
    public activo !: boolean;
    public usuarioUltimaModificacion !: string;
    public fechaUltimaModificacion!: any;

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.idPais = data.idPais;
          this.descripcion = data.descripcion;
          this.activo = data.activo;
          this.pais =  data.pais;
          this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
        }
      }
      public getFullDescription(): string {
        return `${this.descripcion} (${this.id})`;
      }
}