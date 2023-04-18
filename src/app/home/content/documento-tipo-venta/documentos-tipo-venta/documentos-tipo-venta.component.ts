import { Component, Inject, OnInit } from '@angular/core';
import { buildRawList } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNil, isString } from 'lodash';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteFacturacion } from 'src/app/model/clienteFacturacion.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { Documento } from 'src/app/model/documento.model';
import { DocumentoVenta } from 'src/app/model/DocumentoVenta.model';
import { Origen } from 'src/app/model/origen.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { Subcuenta } from 'src/app/model/subcuenta.model';
import { Venta } from 'src/app/model/venta.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-documentos-tipo-venta',
  templateUrl: './documentos-tipo-venta.component.html',
  styleUrls: ['./documentos-tipo-venta.component.scss'],
})
export class DocumentosTipoVentaComponent implements OnInit {
  public documentoVenta!: DocumentoVenta;
  public documentoVentaLogKey: any;
  public paises: Pais[] = [];
  public cuentas: Cuenta[] = [];
  public subcuentas: Subcuenta[] = [];
  public clientes: Cliente[] = [];
  public clientesFacturacion: ClienteFacturacion[] = [];
  public origenes: Origen[] = [];
  public ventas: Venta[] = [];
  public documentos: Documento[] = [];
  public viewing!: boolean;
  public creating!: boolean;
  public showActivo!: boolean;
  public compareId = Helpers.compareId;
  public compareIdS = Helpers.compareIdS;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  clienteFacturacion: any;
  public columns: Column[] = [];
  public placeholders: string[] = [];
  public mostrar: boolean = true;
  public mostrar1: boolean = true;
  public mostrar2: boolean = true;
  public mostrar3: boolean = true;
  public mostrar4: boolean = true;
  public mostrar5: boolean = true;
  public mostrar6: boolean = true;

  constructor(
    private restService: RestService,
    private dialogRef: MatDialogRef<DocumentosTipoVentaComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.columns = this.dialogData.columns;
    this.columns.forEach((column) => {
      this.placeholders.push(column.header);
    });
    this.creating =
      this.dialogData.idPais &&
      this.dialogData.idCliente &&
      this.dialogData.idCuenta &&
      this.dialogData.idSubcuenta &&
      this.dialogData.idTipoDocumento &&
      this.dialogData.idTipoVenta &&
      this.dialogData.idOrigen
        ? false
        : true;
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadDocumentoVenta()
      .pipe(
        mergeMap(() => {
          return this.loadPais();
        })
      )
      .subscribe(
        () => {
          this.loading = false;
        },
        (err: string | { html: string }) => {
          this.alertService.danger(err);
          console.log('error 1');
        }
      );
  }

  public createDocumentoVenta(): void {
    if (this.documentoVenta.subprestacion === undefined) {
      this.documentoVenta.subprestacion = '';
    }
    this.restService
      .create('documentoTipoVenta', {
        activo: this.documentoVenta.activo,
        usuarioUltimaModificacion:
          this.documentoVenta.usuarioUltimaModificacion,
        idPais: this.documentoVenta.pais.id,
        idCliente: this.documentoVenta.cliente.id,
        idCuenta: this.documentoVenta.cuenta.id,
        idSubcuenta: this.documentoVenta.subcuenta.id,
        idTipoVenta: this.documentoVenta.venta.id,
        idTipoDocumento: this.documentoVenta.documento.id,
        idOrigen: this.documentoVenta.origen.id,
        subprestacion: this.documentoVenta.subprestacion,
        idClienteFacturacion: this.documentoVenta.clienteFacturacion.id,
        fechaUltimaModificacion: this.documentoVenta.fechaUltimaModificacion,
      })
      .subscribe(
        (documentoVentaData) => {
          this.dialogRef.close(new DocumentoVenta(this.documentoVenta));
          console.log(
            this.documentoVenta.cliente,
            this.documentoVenta.cuenta,
            this.documentoVenta.subcuenta,
            this.documentoVenta.clienteFacturacion,
            this.documentoVenta.subprestacion,
            this.documentoVenta.venta,
            this.documentoVenta.origen,
            this.documentoVenta.documento
          );
        },
        (err) => {
          this.alertService.danger(err);
          console.log('error create');
        }
      );
  }
  public updateDocumentoVenta(): void {
    this.restService
      .update('documentoTipoVenta', {
        activo: this.documentoVenta.activo,
        usuarioUltimaModificacion:
          this.documentoVenta.usuarioUltimaModificacion,
        idPais: this.documentoVenta.idPais,
        idCliente: this.documentoVenta.idCliente,
        idCuenta: this.documentoVenta.idCuenta,
        idSubcuenta: this.documentoVenta.idSubcuenta,
        idTipoVenta: this.documentoVenta.idTipoVenta,
        idTipoDocumento: this.documentoVenta.idTipoDocumento,
        idOrigen: this.documentoVenta.idOrigen,
        subprestacion: this.documentoVenta.subprestacion,
        idClienteFacturacion: this.documentoVenta.idClienteFacturacion,
        fechaUltimaModificacion: this.documentoVenta.fechaUltimaModificacion,
      })
      .subscribe(
        () => {
          this.dialogRef.close();
        },
        (err) => {
          this.alertService.danger(err);
        }
      );
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.documento_tipo_venta' })
      .pipe(
        mergeMap((paisesData) => {
          this.paises = paisesData.map((paisData) => {
            return new Pais(paisData);
          });
          return of(null as any);
        })
      );
  }

  public loadDocumento($event: any): any {
    this.mostrar4 = false;
    if ($event.value) {
      this.restService
        .find('tipoDocumento', { idPais: $event.value.id })
        .subscribe((documentoData) => {
          this.documentos = documentoData.map((datos) => {
            return new Documento(datos);
          });
          this.mostrar4 = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('tipoDocumento', { idPais: $event })
        .subscribe((documentoData) => {
          this.documentos = documentoData.map((datos) => {
            return new Documento(datos);
          });
          this.mostrar4 = true;
          return of(null as any);
        });
    }
  }

  public loadVenta($event: any): any {
    this.mostrar5 = false;
    if ($event.value) {
      this.restService
        .find('tipoVenta', { idPais: $event.value.id })
        .subscribe((ventaData) => {
          this.ventas = ventaData.map((datos) => {
            return new Venta(datos);
          });
          this.mostrar5 = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('tipoVenta', { idPais: $event })
        .subscribe((ventaData) => {
          this.ventas = ventaData.map((datos) => {
            return new Venta(datos);
          });
          this.mostrar5 = true;
          return of(null as any);
        });
    }
  }

  public loadOrigen($event: any): any {
    this.mostrar6 = false;
    if ($event.value) {
      this.restService
        .find('origenes', { idPais: $event.value.id, activo: true })
        .subscribe((origenData) => {
          this.origenes = origenData.map((datos) => {
            return new Origen(datos);
          });
          this.mostrar6 = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('origenes', { idPais: $event, activo: true })
        .subscribe((origenData) => {
          this.origenes = origenData.map((datos) => {
            return new Origen(datos);
          });
          this.mostrar6 = true;
          return of(null as any);
        });
    }
  }

  public loadClienteFacturacion($event: any): any {
    this.mostrar3 = false;
    if ($event.value) {
      this.restService
        .find('cliente', { idPais: $event.value.id, activo: true })
        .subscribe((clienteFacturacionData) => {
          this.clientesFacturacion = clienteFacturacionData.map((datos) => {
            return new ClienteFacturacion(datos);
          });
          this.mostrar3 = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('cliente', { idPais: $event, activo: true })
        .subscribe((clienteFacturacionData) => {
          this.clientesFacturacion = clienteFacturacionData.map((datos) => {
            return new ClienteFacturacion(datos);
          });
          this.mostrar3 = true;
          return of(null as any);
        });
    }
  }

  public loadCliente($event: any): any {
    this.mostrar = false;
    if ($event.value) {
      this.restService
        .find('cliente', {
          idPais: $event.value.id,
          funcionId: 'ecd.documento_tipo_venta',
        })
        .subscribe((clienteData) => {
          this.clientes = clienteData.map((datos) => {
            return new Cliente(datos);
          });
          this.mostrar = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('cliente', {
          idPais: $event,
          funcionId: 'ecd.documento_tipo_venta',
        })
        .subscribe((clienteData) => {
          this.clientes = clienteData.map((datos) => {
            return new Cliente(datos);
          });
          this.mostrar = true;
          return of(null as any);
        });
    }
  }

  public loadCuenta($event: any): any {
    this.mostrar1 = false;
    if ($event.value) {
      this.restService
        .find('cuenta', {
          idCliente: $event.value.id,
          funcionId: 'ecd.documento_tipo_venta',
        })
        .subscribe((cuentaData) => {
          this.cuentas = cuentaData.map((datos) => {
            return new Cuenta(datos);
          });
          this.mostrar1 = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('cuenta', {
          idCliente: $event,
          funcionId: 'ecd.documento_tipo_venta',
        })
        .subscribe((cuentaData) => {
          this.cuentas = cuentaData.map((datos) => {
            return new Cuenta(datos);
          });
          this.mostrar1 = true;
          return of(null as any);
        });
    }
  }

  public loadSubcuenta($event: any): any {
    this.mostrar2 = false;
    if ($event.value) {
      this.restService
        .find('subcuenta', {
          idCliente: this.documentoVenta.cliente.id,
          idCuenta: $event.value.id,
          funcionId: 'ecd.documento_tipo_venta',
        })
        .subscribe((subcuentaData) => {
          this.subcuentas = subcuentaData.map((datos) => {
            return new Subcuenta(datos);
          });
          this.mostrar2 = true;
          return of(null as any);
        });
    } else {
      this.restService
        .find('subcuenta', {
          idCliente: $event.idCliente,
          idCuenta: $event.idCuenta,
          funcionId: 'ecd.documento_tipo_venta',
        })
        .subscribe((subcuentaData) => {
          this.subcuentas = subcuentaData.map((datos) => {
            return new Subcuenta(datos);
          });
          this.mostrar2 = true;
          return of(null as any);
        });
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

  private loadDocumentoVenta(): Observable<void> {
    if (this.creating) {
      this.documentoVenta = new DocumentoVenta({ activo: true });
      return of(null as any);
    }

    return this.restService
      .get('documentoTipoVenta', {
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idCuenta: this.dialogData.idCuenta,
        idSubcuenta: this.dialogData.idSubcuenta,
        idTipoVenta: this.dialogData.idTipoVenta,
        idTipoDocumento: this.dialogData.idTipoDocumento,
        idOrigen: this.dialogData.idOrigen,
        idClienteFacturacion: this.dialogData.idClienteFacturacion,
      })
      .pipe(
        mergeMap((documentoVentaData) => {
          this.loadCliente(documentoVentaData.idPais);
          this.loadCuenta(documentoVentaData.idCliente);
          this.loadSubcuenta({
            idCuenta: documentoVentaData.idCuenta,
            idCliente: documentoVentaData.idCliente,
          });
          this.loadDocumento(documentoVentaData.idPais);
          this.loadVenta(documentoVentaData.idPais);
          this.loadOrigen(documentoVentaData.idPais);
          this.loadClienteFacturacion(documentoVentaData.idPais);
          this.documentoVenta = new DocumentoVenta(documentoVentaData);
          this.documentoVenta.pais = new Pais();
          this.documentoVenta.cliente = new Cliente();
          this.documentoVenta.cuenta = new Cuenta();
          this.documentoVenta.subcuenta = new Subcuenta();
          this.documentoVenta.venta = new Venta();
          this.documentoVenta.documento = new Documento();
          this.documentoVenta.origen = new Origen();
          this.documentoVenta.clienteFacturacion = new ClienteFacturacion();
          this.documentoVenta.pais.id = this.documentoVenta.idPais;
          this.documentoVenta.cliente.id = this.documentoVenta.idCliente;
          this.documentoVenta.cuenta.id = this.documentoVenta.idCuenta;
          this.documentoVenta.subcuenta.id = this.documentoVenta.idSubcuenta;
          this.documentoVenta.venta.id = this.documentoVenta.idTipoVenta;
          this.documentoVenta.documento.id =
            this.documentoVenta.idTipoDocumento;
          this.documentoVenta.origen.id = this.documentoVenta.idOrigen;
          this.documentoVenta.clienteFacturacion.id =
            this.documentoVenta.idClienteFacturacion;
          this.documentoVentaLogKey = {
            idPais: this.documentoVenta.idPais,
            idCliente: this.documentoVenta.idCliente,
            idCuenta: this.documentoVenta.idCuenta,
            idSubcuenta: this.documentoVenta.idSubcuenta,
            idTipoVenta: this.documentoVenta.idTipoVenta,
            idTipoDocumento: this.documentoVenta.idTipoDocumento,
            idClienteFacturacion: this.documentoVenta.idClienteFacturacion,
          };
          // if (this.concesionarioEnte.pais && this.concesionarioEnte.cliente) {
          //   this.concesionarioEnte.pais != this.paises.find(pais => pais.id === this.concesionarioEnte.pais.id);
          //   this.concesionarioEnte.cliente != this.clientes.find(cliente => cliente.id === this.concesionarioEnte.cliente.id);
          // }
          return of(null as any);
        })
      );
  }
}
