import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DocumentoVenta } from 'src/app/model/DocumentoVenta.model';
import { DocumentosTipoVentaComponent } from './documentos-tipo-venta/documentos-tipo-venta.component';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { BaseCrudComponent } from 'src/app/home/content/base-crud.component';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { Column, RowActionEvent } from 'src/app/gefco/gefco-table/gefco-table.component';

@Component({
  selector: 'app-documento-tipo-venta',
  templateUrl: './documento-tipo-venta.component.html',
  styleUrls: ['./documento-tipo-venta.component.scss']
})
export class DocumentoTipoVentaComponent extends BaseCrudComponent implements OnInit {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, protected override alertService: AlertService, protected override restService: RestService,  protected override router: Router, protected override tableService: TableService) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Datos Comunes'}, {label:'Documentos-Tipo-venta', url:'/home/datos_comunes/documentos_tipo_venta'}];
  }

  public ngOnInit(): void {
    this.useLocationFiltersMetadata();
    super.init().subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onColumn(event: Column[]): void {
    this.columns = event;
  }

  public openDialog(row?: any, viewing?: boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.data = row ? {
      viewing,
      idPais: row.idPais,
      idCliente: row.idCliente,
      idCuenta: row.idCuenta,
      idSubcuenta: row.idSubcuenta,
      idTipoVenta: row.idTipoVenta,
      idTipoDocumento: row.idTipoDocumento,
      idOrigen: row.idOrigen,
      columns: this.columns,
    } : {
      columns: this.columns,
    };
    const dialogRef = this.dialog.open(DocumentosTipoVentaComponent, dialogConfig);
    dialogRef.afterClosed().pipe(
      mergeMap(() => {
        return this.loadRows();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }
  public onDeleteRow(event: RowActionEvent): void {
    this.restService.delete(this.getCrudName(), {idPais: event.row.idPais, idCliente: event.row.idCliente, idCuenta: event.row.idCuenta, idSubcuenta: event.row.idSubcuenta, idTipoVenta: event.row.idTipoVenta, idTipoDocumento: event.row.idTipoDocumento, idOrigen: event.row.idOrigen}).pipe(
      mergeMap(() => {
        event.observer.next(false);
        return this.loadRows();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  protected getFunctionId(): string {
    return "ecd.documento_tipo_venta";
  }

  protected getCrudName(): string {
    return "documentoTipoVenta";
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  } 
}

