import { Cliente } from "./cliente.model";
import { Cuenta } from "./cuenta.model";
import { Pais } from "./pais.model";
import { Subcuenta } from "./subcuenta.model";

export class CertificadoImpreso {
    public id!: number;
    public pais!: Pais;
    public cliente!: Cliente;
    public cuenta!: Cuenta;
    public subcuenta!: Subcuenta;
    public idPais!: number;
    public idCliente!: string;
    public idCuenta!: number;
    public idSubcuenta!: number;
    public descripcion!: string;
    public fechaUltimaModificacion!: any;
    public usuarioUltimaModificacion!: string;
    public activo!: boolean;
    

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.idPais = data.idPais;
          this.idCliente = data.idCliente;
          this.idCuenta = data.idCuenta;
          this.idSubcuenta = data.idSubcuenta;
          this.pais !=  data.pais ? new Pais(data.pais) : null;
          this.cliente != data.cliente ? new Cliente(data.cliente) : null;
          this.cuenta != data.cuenta ? new Cuenta(data.cuenta) : null;
          this.subcuenta != data.subcuenta ? new Subcuenta(data.subcuenta) : null;
          this.descripcion = data.descripcion;
          this.activo = data.activo;
          this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
        }
      }

}