import { Pais } from "./pais.model";

export class Documento {
    public id !: number;
    public pais!: Pais;
/*     public tipoDocumentoCodigo !: number;
 */    public descripcion !: string;
    public idPais !: number;
    public ingresoAutomatico !: boolean;
    public activo !: boolean;
    public usuarioUltimaModificacion !: string;
    public fechaUltimaModificacion!: any;

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
/*           this.tipoDocumentoCodigo = data.tipoDocumentoCodigo;
 */          this.descripcion = data.descripcion;
          this.idPais = data.idPais;
          this.activo = data.activo;
          this.ingresoAutomatico = data.ingresoAutomatico;
          this.pais !=  data.pais ? new Pais(data.pais) : null;
          this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
        }
      }

      public getFullDescription(): string {
        return `${this.descripcion}`;
      }
}