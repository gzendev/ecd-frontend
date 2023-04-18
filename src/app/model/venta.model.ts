import { Pais } from "./pais.model";

export class Venta {
    public id !: number;
    public pais!: Pais;
    public idPais !: number;
    public descripcion !: string;
    public activo !: boolean;
    public ingresoAutomatico !: boolean;
    public usuarioUltimaModificacion !: string;
    public fechaUltimaModificacion!: any;

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.descripcion = data.descripcion;
          this.idPais = data.idPais;
          this.activo = data.activo;
          this.ingresoAutomatico = data.ingresoAutomatico;
          this.pais !=  data.pais ? new Pais(data.pais) : null;
          this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
          console.log("BD ventas", data)
        }
      }

      public getFullDescription(): string {
        return `${this.descripcion}`;
      }
}