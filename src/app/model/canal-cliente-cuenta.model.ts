import { Canal } from "./canal.model";
import { Cliente } from "./cliente.model";
import { Cuenta } from "./cuenta.model";

export class CanalClienteCuenta {

  public canal!: Canal;
  public cliente!: Cliente;
  public cuenta!: Cuenta;
  public codContable!: string;
  public activo!: boolean;
  public fechaUltimaModificacion!: Date;
  public usuarioUltimaModificacion!: string;

  constructor(data?: any) {
    if (data) {
      this.canal != data.canal ? new Canal(data.canal) : null;
      this.cliente != data.cliente ? new Cliente(data.cliente) : null;
      this.cuenta != data.cuenta ? new Cuenta(data.cuenta) : null;
      this.codContable = data.codContable;
      this.activo = data.activo;
      this.fechaUltimaModificacion != data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }
}
