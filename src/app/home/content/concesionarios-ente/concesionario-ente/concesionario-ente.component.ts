import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { mergeMap, Observable, of } from 'rxjs';
import { Ciudad } from 'src/app/model/ciudad.model';
import { Cliente } from 'src/app/model/cliente.model';
import { ConcesionarioEnte } from 'src/app/model/concesionario-ente.model';
import { Localidad } from 'src/app/model/localidad.model';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { isString } from 'lodash-es';

@Component({
  selector: 'app-concesionario-ente',
  templateUrl: './concesionario-ente.component.html',
  styleUrls: ['./concesionario-ente.component.scss'],
})
export class ConcesionarioEnteComponent implements OnInit {
  
  public concesionarioEnte!: ConcesionarioEnte;
  public concesionarioEnteLogKey: any;
  public paises: Pais[] = [];
  public paisesCombo: PaisCombo[] = [];
  public provincias: Provincia[] = [];
  public ciudades: Ciudad[] = [];
  public localidades: Localidad[] = [];
  public clientes: Cliente[] = [];
  public viewing!: boolean;
  public creating!: boolean;
  public compareId = Helpers.compareId;
  public compareIdS = Helpers.compareIdS;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  public columns: Column[] = [];
  public placeholders: string[] = [];
  public mostrar: boolean = true;
  public mostrar1: boolean = true;
  public mostrar2: boolean = true;
  public mostrar3: boolean = true;
  
  constructor(
    private restService: RestService,
    private dialogRef: MatDialogRef<ConcesionarioEnteComponent>,
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
    this.loadConcesionarioEnte()
    .pipe(
      mergeMap(() => {
        return this.loadPais();
      }),
      mergeMap(() => {
        return this.loadPaisCombo();
      }))
      .subscribe(
        () => {
          this.loading = false;
        },
        (err: string | { html: string; }) => {
          this.alertService.danger(err);
        }
      );
  }

  public createConcesionarioEnte(): void {
    this.restService
      .create('concesionariosEnte', {
        activo: this.concesionarioEnte.activo,
        usuarioUltimaModificacion: this.concesionarioEnte.usuarioUltimaModificacion,
        id: this.concesionarioEnte.id,
        descripcion: this.concesionarioEnte.descripcion,
        idPais: this.concesionarioEnte.pais.id,
        idCliente: this.concesionarioEnte.cliente.id,
        direccion: this.concesionarioEnte.direccion,
        idPaisEnte: this.concesionarioEnte.paisEnte.id,
        idProvincia: this.concesionarioEnte.provincia.id,
        idCiudad: this.concesionarioEnte.ciudad.id,
        idLocalidad: this.concesionarioEnte.localidad.id, 
        cp: this.concesionarioEnte.cod_postal,
        telefono: this.concesionarioEnte.telefono,
        email: this.concesionarioEnte.mail,
        contacto: this.concesionarioEnte.contacto,
        cuit: this.concesionarioEnte.cuit,
        fechaUltimaModificacion: this.concesionarioEnte.fechaUltimaModificacion
      })
      .subscribe(
        (concesionarioEnteData) => {
          this.dialogRef.close(new ConcesionarioEnte(this.concesionarioEnte));
        },
        (err) => {
          this.alertService.danger(err);
        }
      );
  }

  public updateConcesionarioEnte(): void {
    this.restService.update('concesionariosEnte', {
      activo: this.concesionarioEnte.activo,
      usuarioUltimaModificacion: this.concesionarioEnte.usuarioUltimaModificacion,
      id: this.concesionarioEnte.id,
      descripcion: this.concesionarioEnte.descripcion,
      idPais: this.concesionarioEnte.pais.id,
      idCliente: this.concesionarioEnte.cliente.id,
      direccion: this.concesionarioEnte.direccion,
      idPaisEnte: this.concesionarioEnte.paisEnte.id,
      idProvincia: this.concesionarioEnte.provincia.id,
      idCiudad: this.concesionarioEnte.ciudad.id,
      idLocalidad: this.concesionarioEnte.localidad.id,
      cp: this.concesionarioEnte.cod_postal,
      telefono: this.concesionarioEnte.telefono,
      email: this.concesionarioEnte.mail,
      contacto: this.concesionarioEnte.contacto,
      cuit: this.concesionarioEnte.cuit,
      fechaUltimaModificacion: this.concesionarioEnte.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.concesionarios_ente' })
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
  
  public loadCliente($event: any): any {
    this.mostrar = false;
    if ($event.value) {
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.concesionarios_ente' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.concesionarios_ente' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    }
  }

  public loadProvincia(event: any): any {
    this.mostrar1 = false;
    if (event.value) {
      this.restService.findC('provincia', { paisId: event.value.id, activo: true }).subscribe((provinciasData) => {
        this.provincias = provinciasData.map((provinciaData) => {
          return new Provincia(provinciaData);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    } else {
      this.restService.findC('provincia', { paisId: event, activo: true }).subscribe((provinciasData) => {
        this.provincias = provinciasData.map((provinciaData) => {
          return new Provincia(provinciaData);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    }
    
  }

  public loadCiudad(event: any): any {
    this.mostrar2 = false;
    if (event.value) {
      this.restService.findC('ciudad', { provinciaId: event.value.id, activo: true }).subscribe((ciudadesData) => {
        this.ciudades = ciudadesData.map((ciudadData) => {
          return new Ciudad(ciudadData);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    } else {
      this.restService.findC('ciudad', { provinciaId: event, activo: true }).subscribe((ciudadesData) => {
        this.ciudades = ciudadesData.map((ciudadData) => {
          return new Ciudad(ciudadData);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    }
  }

  public loadLocalidad(event: any): any {
    this.mostrar3 = false;
    if(event.value) {
      this.restService.findC('localidad', { ciudadId: event.value.id, activo: true }).subscribe((localidadesData) => {
        this.localidades = localidadesData.map((localidadData) => {
          return new Localidad(localidadData);
        });
        this.mostrar3 = true;
        return of(null as any);
      })
    } else {
      this.restService.findC('localidad', { ciudadId: event, activo: true }).subscribe((localidadesData) => {
        this.localidades = localidadesData.map((localidadData) => {
          return new Localidad(localidadData);
        });
        this.mostrar3 = true;
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

  private loadConcesionarioEnte(): Observable<void> {
    if(this.creating){
      this.concesionarioEnte = new ConcesionarioEnte({activo: true})
      return of(null as any);
    }

    return this.restService.get('concesionariosEnte', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
      })
      .pipe(
        mergeMap((concesionarioEnteData) => {
          this.loadCliente(concesionarioEnteData.idPais);
          this.loadProvincia(concesionarioEnteData.idPaisEnte);
          this.loadCiudad(concesionarioEnteData.idProvincia);
          this.loadLocalidad(concesionarioEnteData.idCiudad);
          this.concesionarioEnte = new ConcesionarioEnte(concesionarioEnteData);
          this.concesionarioEnte.pais = new PaisCombo();
          this.concesionarioEnte.cliente = new Cliente();
          this.concesionarioEnte.paisEnte = new PaisCombo();
          this.concesionarioEnte.provincia = new Provincia();
          this.concesionarioEnte.ciudad = new Ciudad();
          this.concesionarioEnte.localidad = new Localidad();
          this.concesionarioEnte.pais.id = this.concesionarioEnte.idPais;
          this.concesionarioEnte.cliente.id = this.concesionarioEnte.idCliente;
          this.concesionarioEnte.paisEnte.id = this.concesionarioEnte.idPaisEnte;
          this.concesionarioEnte.provincia.id = this.concesionarioEnte.idProvincia;
          this.concesionarioEnte.ciudad.id = this.concesionarioEnte.idCiudad;
          this.concesionarioEnte.localidad.id = this.concesionarioEnte.idLocalidad;
          this.concesionarioEnteLogKey = {id: this.concesionarioEnte.id, idPais: this.concesionarioEnte.idPais, idCliente: this.concesionarioEnte.idCliente};
          // if (this.concesionarioEnte.pais && this.concesionarioEnte.cliente) {
          //   this.concesionarioEnte.pais != this.paises.find(pais => pais.id === this.concesionarioEnte.pais.id);
          //   this.concesionarioEnte.cliente != this.clientes.find(cliente => cliente.id === this.concesionarioEnte.cliente.id);
          // }
          return of(null as any);
        })
        );
    } 
}