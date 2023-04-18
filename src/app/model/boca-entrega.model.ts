import { Ciudad } from "./ciudad.model";
import { Cliente } from "./cliente.model";
import { Concesionario } from "./concesionario.model";
import { Localidad } from "./localidad.model";
import { PaisCombo } from "./pais-combo.model";
import { Pais } from "./pais.model";
import { Provincia } from "./provincia.model";

export class BocaEntrega {
    public id!: number;
    public pais!: Pais;
    public cliente!: Cliente;
    public idPais!: number;
    public idCliente!: string;
    public concesionario!: Concesionario;
    public idConcesionario!: string;
    public descripcion!: string;
    public direccion!: string;
    public paisEnte!: PaisCombo;
    public provincia!: Provincia;
    public ciudad!: Ciudad;
    public localidad!: Localidad;
    public idPaisEnte!: number;
    public idProvincia!: number;
    public idCiudad!: number;
    public idLocalidad!: number;
    public cod_postal!: number;
    public telefono!: number;
    public email!: string;
    public cuit!: number;
    public activo!: boolean;
    public usuarioUltimaModificacion!: string;
    public fechaUltimaModificacion!: any;
    

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.idPais = data.idPais;
          this.idCliente = data.idCliente;
          this.concesionario != data.concesionario ? new Concesionario(data.concesionario) : null;
          this.pais !=  data.pais ? new Pais(data.pais) : null;
          this.cliente != data.cliente ? new Cliente(data.cliente) : null;
          this.paisEnte != data.paisEnte ? new PaisCombo(data.paisEnte) : null;
          this.provincia != data.provincia ? new Provincia(data.provincia) : null;
          this.ciudad != data.ciudad ? new Ciudad(data.ciudad) : null;
          this.localidad != data.localidad ? new Localidad(data.localidad) : null;
          this.idConcesionario = data.idConcesionario;
          this.descripcion = data.descripcion;
          this.direccion = data.direccion;
          this.idPaisEnte = data.idPaisEnte;
          this.idProvincia = data.idProvincia;
          this.idCiudad = data.idCiudad;
          this.idLocalidad = data.idLocalidad;
          this.cod_postal = data.cp;
          this.telefono = data.telefono;
          this.email = data.email;
          this.cuit = data.cuit;
          this.activo = data.activo;
          this.fechaUltimaModificacion != data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
          this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
        }
      }

}