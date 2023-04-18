import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isString } from 'lodash-es';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { Cliente } from 'src/app/model/cliente.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { ResultadoBloqueo } from 'src/app/model/resultado-bloqueo.model';
import { Subcuenta } from 'src/app/model/subcuenta.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-resultado-bloqueo',
  templateUrl: './resultado-bloqueo.component.html',
  styleUrls: ['./resultado-bloqueo.component.scss']
})
export class ResultadoBloqueoComponent implements OnInit {

  public resultadoBloqueo!: ResultadoBloqueo;
  public resultadoBloqueoLogKey: any;
  public paises: Pais[] = [];
  public clientes: Cliente[] = [];
  public cuentas: Cuenta[] = [];
  public subcuentas: Subcuenta[] = [];
  public viewing!: boolean;
  public creating!: boolean;
  public compareId = Helpers.compareId;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  public columns: Column[] = [];
  public placeholders: string[] = [];
  public mostrar: boolean = true;
  public mostrar1: boolean = true;
  public mostrar2: boolean = true;
  
  constructor(
    private restService: RestService,
    private dialogRef: MatDialogRef<ResultadoBloqueoComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.creating = this.dialogData.id && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta && this.dialogData.idSubcuenta || this.dialogData.id == 0 && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta && this.dialogData.idSubcuenta ? false : true;
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadResultadoBloqueo()
      .pipe(
        mergeMap(() => {
          return this.loadPais();
        }),
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

  public createResultadoBloqueo(): void {
    this.restService
      .create('resultadoBloqueo', {
        activo: this.resultadoBloqueo.activo,
        usuarioUltimaModificacion: this.resultadoBloqueo.usuarioUltimaModificacion,
        id: this.resultadoBloqueo.id,
        idPais: this.resultadoBloqueo.pais.id,
        idCliente: this.resultadoBloqueo.cliente.id,
        idCuenta: this.resultadoBloqueo.cuenta.id,
        idSubcuenta: this.resultadoBloqueo.subcuenta.id,
        bloquea: this.resultadoBloqueo.bloquea,
        desbloquea: this.resultadoBloqueo.desbloquea,
        fechaUltimaModificacion: this.resultadoBloqueo.fechaUltimaModificacion
      })
      .subscribe(
        (resultadoBloqueoData) => {
          this.dialogRef.close(new ResultadoBloqueo(this.resultadoBloqueo));
          console.log('Resultado del bloqueo: ', this.resultadoBloqueo);
        },
        (err) => {
          this.alertService.danger(err);
        }
      );
  }

  public updateResultadoBloqueo(): void {
    this.restService.update('resultadoBloqueo', {
      activo: this.resultadoBloqueo.activo,
      usuarioUltimaModificacion: this.resultadoBloqueo.usuarioUltimaModificacion,
      id: this.resultadoBloqueo.id,
      idPais: this.resultadoBloqueo.pais.id,
      idCliente: this.resultadoBloqueo.cliente.id,
      idCuenta: this.resultadoBloqueo.cuenta.id,
      idSubcuenta: this.resultadoBloqueo.subcuenta.id,
      bloquea: this.resultadoBloqueo.bloquea,
      desbloquea: this.resultadoBloqueo.desbloquea,
      fechaUltimaModificacion: this.resultadoBloqueo.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.resultados_bloqueo' })
      .pipe(
        mergeMap((paisesData) => {
          this.paises = paisesData.map((paisData) => {
            return new Pais(paisData);
          });
          return of(null as any);
        })
      );
  }

  public loadCliente($event: any): any {
    this.mostrar = false;
    if ($event.value) {
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.resultados_bloqueo' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.resultados_bloqueo' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    }
  }

  public loadCuenta($event: any): any {
    this.mostrar1 = false;
    if ($event.value) {
      this.restService.find('cuenta', { idCliente: $event.value.id, funcionId: 'ecd.resultados_bloqueo' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    } else {
      this.restService.find('cuenta', { idCliente: $event, funcionId: 'ecd.resultados_bloqueo' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    }
  }

  public loadSubcuenta($event: any): any {
    this.mostrar2 = false;
    if ($event.value) {
      this.restService.find('subcuenta', { idCliente: this.resultadoBloqueo.cliente.id, idCuenta: $event.value.id, funcionId: 'ecd.resultados_bloqueo' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    } else {
      this.restService.find('subcuenta', { idCliente: $event.idCliente, idCuenta: $event.idCuenta, funcionId: 'ecd.resultados_bloqueo' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        this.mostrar2 = true;
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
  
  private loadResultadoBloqueo(): Observable<void> {
    if (this.creating) {
      this.resultadoBloqueo = new ResultadoBloqueo({activo: true});
      return of(null as any);
    }
    return this.restService.get('resultadoBloqueo', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idCuenta: this.dialogData.idCuenta,
        idSubcuenta: this.dialogData.idSubcuenta
      })
      .pipe(
        mergeMap((resultadoBloqueoData) => {
          this.loadCliente(resultadoBloqueoData.idPais);
          this.loadCuenta(resultadoBloqueoData.idCliente);
          this.loadSubcuenta({idCliente: resultadoBloqueoData.idCliente, idCuenta: resultadoBloqueoData.idCuenta});
          this.resultadoBloqueo = new ResultadoBloqueo(resultadoBloqueoData);
          this.resultadoBloqueo.pais = new PaisCombo();
          this.resultadoBloqueo.cliente = new Cliente();
          this.resultadoBloqueo.cuenta = new Cuenta();
          this.resultadoBloqueo.subcuenta = new Subcuenta();
          this.resultadoBloqueo.pais.id = this.resultadoBloqueo.idPais;
          this.resultadoBloqueo.cliente.id = this.resultadoBloqueo.idCliente;
          this.resultadoBloqueo.cuenta.id = this.resultadoBloqueo.idCuenta;
          this.resultadoBloqueo.subcuenta.id = this.resultadoBloqueo.idSubcuenta;
          this.resultadoBloqueoLogKey = {id: this.resultadoBloqueo.id, idPais: this.resultadoBloqueo.pais.id, idCliente: this.resultadoBloqueo.cliente.id, idCuenta: this.resultadoBloqueo.cuenta.id, idSubcuenta: this.resultadoBloqueo.subcuenta.id};
          // if (this.resultadoBloqueo.pais && this.resultadoBloqueo.cliente && this.resultadoBloqueo.cuenta && this.resultadoBloqueo.subcuenta) {
          //   this.resultadoBloqueo.pais != this.paises.find(pais => pais.id === this.resultadoBloqueo.pais.id);
          //   this.resultadoBloqueo.cliente != this.clientes.find(cliente => cliente.id === this.resultadoBloqueo.cliente.id);
          //   this.resultadoBloqueo.cuenta != this.cuentas.find(cuenta => cuenta.id === this.resultadoBloqueo.cuenta.id);
          //   this.resultadoBloqueo.subcuenta != this.subcuentas.find(subcuenta => subcuenta.id === this.resultadoBloqueo.subcuenta.id);
          // }
          return of(null as any);
        })
      );
  }

}
