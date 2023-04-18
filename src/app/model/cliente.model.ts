import { Pais } from "./pais.model";

export class Cliente {

  public id!: string;
  public descripcion!: string;
  public cuit!: string;
  public direccion!: string;
  public codPostal!: string;
  public telefono!: string;
  public email!: string;
  public observacion!: string;
  public clientePadre!: Cliente;
  public codClienteContable!: string;
  public codClienteMicrosiga!: string;
  public largoModBase!: number;
  public numeroCAI!: string;
  public fechaVenceCAI!: Date;
  public adheridoRAF!: boolean;
  public pais!: Pais;
  public activo!: boolean;
  public fechaUtimaModificacion!: Date;
  public usuarioUltimaModificacion!: string ;

  constructor(data?: any) {
    if (data) {
      this.id = data.idCliente;
      this.descripcion = data.descripcion;
      this.cuit = data.cuit;
      this.direccion = data.direccion;
      this.codPostal = data.codPostal;
      this.telefono = data.telefono;
      this.email = data.email;
      this.observacion = data.observacion;
      this.clientePadre != data.clientePadre ? new Cliente(data.clientePadre) : null;
      this.codClienteContable = data.codClienteContable;
      this.codClienteMicrosiga = data.codClienteMicrosiga;
      this.largoModBase = data.largoModBase;
      this.numeroCAI = data.numeroCAI;
      this.fechaVenceCAI != data.fechaVenceCAI ? new Date(data.fechaVenceCAI) : null;
      this.adheridoRAF = data.adheridoRAF;
      this.pais != data.pais ? new Pais(data.pais) : null;
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
}
