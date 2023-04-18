import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isString } from 'lodash-es';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { BocaEntrega } from 'src/app/model/boca-entrega.model';
import { Ciudad } from 'src/app/model/ciudad.model';
import { Cliente } from 'src/app/model/cliente.model';
import { Concesionario } from 'src/app/model/concesionario.model';
import { Localidad } from 'src/app/model/localidad.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-boca-entrega',
  templateUrl: './boca-entrega.component.html',
  styleUrls: ['./boca-entrega.component.scss']
})
export class BocaEntregaComponent implements OnInit {

  public bocaEntrega!: BocaEntrega;
  public bocaEntregaLogKey: any;
  public paises: Pais[] = [];
  public paisesCombo: PaisCombo[] = [];
  public provincias: Provincia[] = [];
  public ciudades: Ciudad[] = [];
  public localidades: Localidad[] = [];
  public clientes: Cliente[] = [];
  public codigos: Concesionario[] = [];
  public viewing!: boolean;
  public creating!: boolean;
  public displayFullDescription = Helpers.displayFullDescription;
  public compareId = Helpers.compareId;
  public compareIdS = Helpers.compareIdS;
  public loading = true;
  public columns: Column[] = [];
  public placeholders: string[] = [];
  public mostrar: boolean = true;
  public mostrar1: boolean = true;
  public mostrar2: boolean = true;
  public mostrar3: boolean = true;
  public mostrar4: boolean = true;
  
  constructor(
    private restService: RestService,
    private dialogRef: MatDialogRef<BocaEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.creating = this.dialogData.id && this.dialogData.idPais && this.dialogData.idCliente || this.dialogData.id == 0 && this.dialogData.idPais && this.dialogData.idCliente ? false : true;
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadBocaEntrega()
      .pipe(
        mergeMap(() => {
          return this.loadPais();
        }),
        mergeMap(() => {
          return this.loadPaisCombo();
        })
      )
      .subscribe(
        () => {
          this.loading = false;
        },
        (err: string | { html: string; }) => {
          this.alertService.danger(err);
        }
      );
  }

  public createBocaEntrega(): void {
    console.log(this.bocaEntrega)
    this.restService
      .create('bocaEntregaEnte', {
        activo: this.bocaEntrega.activo,
        usuarioUltimaModificacion: this.bocaEntrega.usuarioUltimaModificacion,
        id: this.bocaEntrega.id,
        descripcion: this.bocaEntrega.descripcion,
        idPais: this.bocaEntrega.pais.id,
        idCliente: this.bocaEntrega.cliente.id,
        direccion: this.bocaEntrega.direccion,
        idPaisEnte: this.bocaEntrega.paisEnte.id,
        idProvincia: this.bocaEntrega.provincia.id,
        idCiudad: this.bocaEntrega.ciudad.id,
        idLocalidad: this.bocaEntrega.localidad.id, 
        cp: this.bocaEntrega.cod_postal,
        telefono: this.bocaEntrega.telefono,
        email: this.bocaEntrega.email,
        idConcesionario: this.bocaEntrega.concesionario.id,
        cuit: this.bocaEntrega.cuit,
        fechaUltimaModificacion: this.bocaEntrega.fechaUltimaModificacion
      })
      .subscribe(
        (bocaEntregaData) => {
          this.dialogRef.close(new BocaEntrega(this.bocaEntrega));
          console.log('Boca de Entrega: ', this.bocaEntrega);
        },
        (err) => {
          this.alertService.danger(err);
        }
      );
  }

  public updateBocaEntrega(): void {
    this.restService.update('bocaEntregaEnte', {
      activo: this.bocaEntrega.activo,
      usuarioUltimaModificacion: this.bocaEntrega.usuarioUltimaModificacion,
      id: this.bocaEntrega.id,
      descripcion: this.bocaEntrega.descripcion,
      idPais: this.bocaEntrega.idPais,
      idCliente: this.bocaEntrega.idCliente,
      direccion: this.bocaEntrega.direccion,
      idPaisEnte: this.bocaEntrega.paisEnte.id,
      idProvincia: this.bocaEntrega.provincia.id,
      idCiudad: this.bocaEntrega.ciudad.id,
      idLocalidad: this.bocaEntrega.localidad.id,
      cp: this.bocaEntrega.cod_postal,
      telefono: this.bocaEntrega.telefono,
      email: this.bocaEntrega.email,
      idConcesionario: this.bocaEntrega.idConcesionario,
      cuit: this.bocaEntrega.cuit,
      fechaUltimaModificacion: this.bocaEntrega.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.boca_entrega_ente' })
      .pipe(
        mergeMap((paisesData) => {
          this.paises = paisesData.map((paisData) => {
            return new Pais(paisData);
          });
          return of(null as any);
        })
      );
  }

  public loadPaisCombo(): Observable<void> {
    return this.restService
      .getAllC('pais', { activo: true })
      .pipe(
        mergeMap((paisesData) => {
          this.paisesCombo = paisesData.map((paisData) => {
            return new PaisCombo(paisData);
          });
          return of(null as any);
        })
      );
  }

  public loadCodigoConcesionario($event: any): any {
    this.mostrar1 = false;
    if ($event.value) {
      this.restService.find('concesionariosEnte', {
        id: this.bocaEntrega.id, 
        idPais: this.bocaEntrega.pais.id,
        idCliente: $event.value.id
      }).subscribe((codigosData) => {
        this.codigos = codigosData.map((codigoData) => {
          console.log(codigoData)
          return new Concesionario(codigoData);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    } else {
      this.restService.find('concesionariosEnte', {
        id: $event.id, 
        idPais: $event.idPais,
        idCliente: $event.idCliente
      }).subscribe((codigosData) => {
        this.codigos = codigosData.map((codigoData) => {
          return new Concesionario(codigoData);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    }
  }

  public loadCliente($event: any): any {
    this.mostrar = false;
    if ($event.value) {
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.BocaEntregaEnte' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.BocaEntregaEnte' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    }
  }

  public loadProvincia(event: any): any {
    this.mostrar2 = false;
    if (event.value) {
      this.restService.findC('provincia', { paisId: event.value.id, activo: true }).subscribe((provinciasData) => {
        this.provincias = provinciasData.map((provinciaData) => {
          return new Provincia(provinciaData);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    } else {
      this.restService.findC('provincia', { paisId: event, activo: true }).subscribe((provinciasData) => {
        this.provincias = provinciasData.map((provinciaData) => {
          return new Provincia(provinciaData);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    }
    
  }

  public loadCiudad(event: any): any {
    this.mostrar3 = false;
    if (event.value) {
      this.restService.findC('ciudad', { provinciaId: event.value.id, activo: true }).subscribe((ciudadesData) => {
        this.ciudades = ciudadesData.map((ciudadData) => {
          return new Ciudad(ciudadData);
        });
        this.mostrar3 = true;
        return of(null as any);
      })
    } else {
      this.restService.findC('ciudad', { provinciaId: event, activo: true }).subscribe((ciudadesData) => {
        this.ciudades = ciudadesData.map((ciudadData) => {
          return new Ciudad(ciudadData);
        });
        this.mostrar3 = true;
        return of(null as any);
      })
    }
  }

  public loadLocalidad(event: any): any {
    this.mostrar4 = false;
    if(event.value) {
      this.restService.findC('localidad', { ciudadId: event.value.id, activo: true }).subscribe((localidadesData) => {
        this.localidades = localidadesData.map((localidadData) => {
          return new Localidad(localidadData);
        });
        this.mostrar4 = true;
        return of(null as any);
      })
    } else {
      this.restService.findC('localidad', { ciudadId: event, activo: true }).subscribe((localidadesData) => {
        this.localidades = localidadesData.map((localidadData) => {
          return new Localidad(localidadData);
        });
        this.mostrar4 = true;
        return of(null as any);
      })
    }
    
  }

  public displayMetadataItem(metadataItem: Pais | string, option?: string): string {
    if (!metadataItem) {
      return null as any;
    }
    if (isString(metadataItem)) {
      return metadataItem;
    }
    if (!metadataItem.descripcion) {
      return String(metadataItem.id);
    }
    if(metadataItem.descripcion && metadataItem.id && option){
      return `${metadataItem.descripcion} - ${metadataItem.id}`;
    }
    return `${metadataItem.descripcion}`;
  }

  private loadBocaEntrega(): Observable<void> {
    if (this.creating) {
      this.bocaEntrega = new BocaEntrega({activo: true});
      return of(null as any);
    }
    return this.restService.get('bocaEntregaEnte', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idConcesionario: this.dialogData.idConcesionario,
      })
      .pipe(
        mergeMap((bocaEntregaData) => {
          this.loadCliente(bocaEntregaData.idPais);
          this.loadProvincia(bocaEntregaData.idPaisEnte);
          this.loadCiudad(bocaEntregaData.idProvincia);
          this.loadLocalidad(bocaEntregaData.idCiudad);
          this.loadCodigoConcesionario({
            id: bocaEntregaData.id,
            idPais: bocaEntregaData.idPais,
            idCliente: bocaEntregaData.idCliente,
          })
          this.bocaEntrega = new BocaEntrega(bocaEntregaData);
          this.bocaEntrega.pais = new PaisCombo();
          this.bocaEntrega.cliente = new Cliente();
          this.bocaEntrega.concesionario = new Concesionario();
          this.bocaEntrega.paisEnte = new PaisCombo();
          this.bocaEntrega.provincia = new Provincia();
          this.bocaEntrega.ciudad = new Ciudad();
          this.bocaEntrega.localidad = new Localidad();
          this.bocaEntrega.pais.id = this.bocaEntrega.idPais;
          this.bocaEntrega.cliente.id = this.bocaEntrega.idCliente;
          this.bocaEntrega.paisEnte.id = this.bocaEntrega.idPaisEnte;
          this.bocaEntrega.provincia.id = this.bocaEntrega.idProvincia;
          this.bocaEntrega.ciudad.id = this.bocaEntrega.idCiudad;
          this.bocaEntrega.localidad.id = this.bocaEntrega.idLocalidad;
          this.bocaEntrega.concesionario.id = this.bocaEntrega.idConcesionario;
          this.bocaEntregaLogKey = {id: this.bocaEntrega.id, idPais: this.bocaEntrega.idPais, idCliente: this.bocaEntrega.idCliente};
          // if (this.bocaEntrega.pais && this.bocaEntrega.cliente) {
          //   this.bocaEntrega.pais != this.paises.find(pais => pais.id === this.bocaEntrega.pais.id);
          //   this.bocaEntrega.cliente != this.clientes.find(cliente => cliente.id === this.bocaEntrega.cliente.id);
          // }
          return of(null as any);
        })
      );
  }

}
