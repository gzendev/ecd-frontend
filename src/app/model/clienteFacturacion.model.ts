import { Pais } from "./pais.model";
/*DEFINIR BIEN ESTA CLASE*/
export class ClienteFacturacion {

  public id!: string ;
  public descripcion!: string;
/*   public idPais !: number;
 */  public pais!: Pais;
  public activo!: boolean;
  public fechaUtimaModificacion!: Date;
  public usuarioUltimaModificacion!: string ;

  constructor(data?: any) {
    if (data) {
      this.id = data.idCliente;
      this.descripcion = data.descripcion;
/*       this.idPais = data.idPais;
 */   this.pais != data.pais ? new Pais(data.pais) : null;
      this.activo = data.activo;
      this.fechaUtimaModificacion != data.fechaUtimaModificacion ? new Date(data.fechaUtimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  } 

  public getFullDescription(): string {
    if (this.descripcion && this.id) {
      return `${this.descripcion}`;
    }
    return this.descripcion || this.id;
  }

/*   public setId(): void{
    if (this.id === undefined ){
      this.id = "";
    } 
  }*/
}
