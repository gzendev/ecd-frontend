export class Pais {

    public id!: number;
    public descripcion!: string;
    public activo!: boolean;
    public fechaUltimaModificacion!: Date | null;
    public usuarioUltimaModificacion!: string;
  
    constructor(data?: any) {
      if (data) {
        this.id = data.idPais;
        this.descripcion = data.descripcion;
        // this.activo = data.activo;
        // this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
        // this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
      }
    }
    
    public getFullDescription(): string {
      return `${this.descripcion}`;
    }
}