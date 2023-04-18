import { Pais } from "./pais.model";
import { Cuenta } from "./cuenta.model";
import { Cliente } from "./cliente.model";
import { Subcuenta } from "./subcuenta.model";
import { Venta } from "./venta.model";
import { Documento } from "./documento.model";
import { Origen } from "./origen.model";
import { ClienteFacturacion } from "./clienteFacturacion.model";


export class DocumentoVenta {
    public activo!: boolean;    
    public usuarioUltimaModificacion!: string;
    public idPais!: number;
    public idCuenta!: number;
    public idSubcuenta!: number;
    public idTipoVenta!: number;
    public idTipoDocumento!: number;
    public idOrigen!: number;
    public idClienteFacturacion!: string;
    public idCliente!: string;
    public fechaUltimaModificacion!: any;
    public pais!: Pais;
    public cuenta!: Cuenta;
    public cliente!: Cliente;
    public subcuenta!: Subcuenta;
    public venta!: Venta;
    public documento!: Documento;
    public origen!: Origen;    
    public subprestacion!: string;
    public clienteFacturacion!: ClienteFacturacion;
    
    /* public idTipoVenta !: Venta;
    public idTipoDocumento !: Documento;
    public idOrigen !: Origen;
    public idClienteFacturacion!: ClienteFacturacion; */
 

    constructor(data?: any) {
        if (data) {
          this.idPais = data.idPais;
          this.idCuenta = data.idCuenta;
          this.idSubcuenta = data.idSubcuenta;
          this.subprestacion = data.subprestacion;
          this.idCliente = data.idCliente ;
          this.activo = data.activo;
          this.pais !=  data.pais ? new Pais(data.pais) : null;
          this.cuenta !=  data.cuenta ? new Cuenta(data.cuenta) : null;
          this.subcuenta !=  data.subcuenta ? new Subcuenta(data.subcuenta) : null;
          this.cliente !=  data.cliente ? new Cliente(data.cliente) : null;
          this.venta !=  data.venta ? new Venta(data.venta) : null;
          this.origen !=  data.origen ? new Origen(data.origen) : null;
          this.clienteFacturacion !=  data.clienteFacturacion ? new ClienteFacturacion(data.clienteFacturacion) : null;
          this.documento !=  data.documento ? new Documento(data.documento) : null;
          this.idTipoVenta  = data.idTipoVenta;
          this.idTipoDocumento = data.idTipoDocumento;
          this.idOrigen = data.idOrigen;
          this.idClienteFacturacion = data.idClienteFacturacion ? new data.ClienteFacturacion(data.idCliente)  : null;
          this.fechaUltimaModificacion != data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
   
        } 
      
    }
    

}