import { Cliente } from "./cliente.model";
import { Concesionario } from "./concesionario.model";
import { Cuenta } from "./cuenta.model";
import { Pais } from "./pais.model";

export class Gestor {
    public id!: number;
    public pais!: Pais;
    public cliente!: Cliente;
    public cuenta!: Cuenta;
    public idPais!: number;
    public idCliente!: string;
    public idCuenta!: number;
    public descripcion!: string;
    public cod_concesionario!: Concesionario[];
    public idConcesionarios!: string[];
    public activo!: boolean;
    public usuarioUltimaModificacion!: string;
    public fechaUltimaModificacion!: any;
    

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.idPais = data.idPais;
          this.idCliente = data.idCliente;
          this.idCuenta = data.idCuenta;
          this.pais !=  data.pais ? new Pais(data.pais) : null;
          this.cliente != data.cliente ? new Cliente(data.cliente) : null;
          this.cuenta != data.cuenta ? new Cuenta(data.cuenta) : null;
          this.descripcion = data.descripcion;
          this.cod_concesionario = data.idConcesionarios;
          this.idConcesionarios = data.idConcesionarios;
          this.activo = data.activo;
          this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
        }
      }

}