export class TokenUser {

    public nombre!: string;
    public apellido!: string;
    public id!: number;
    public administrador!: boolean;
    public pais!: number;
  
    constructor(data?: any) {
      if (data) {
        this.nombre = data.nombre.toLowerCase().split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        this.apellido = data.apellido.toLowerCase().split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        this.id = data.id;
        this.administrador = data.administrador;
        this.pais = data.pais;
      }
    }
}
