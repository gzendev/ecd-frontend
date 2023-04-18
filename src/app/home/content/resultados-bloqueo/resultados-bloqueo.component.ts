import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Column, RowActionEvent } from 'src/app/gefco/gefco-table/gefco-table.component';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { BaseCrudComponent } from '../base-crud.component';
import { ResultadoBloqueoComponent } from './resultado-bloqueo/resultado-bloqueo.component';

@Component({
  selector: 'app-resultados-bloqueo',
  templateUrl: './resultados-bloqueo.component.html',
  styleUrls: ['./resultados-bloqueo.component.scss']
})
export class ResultadosBloqueoComponent extends BaseCrudComponent implements OnInit {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, protected override alertService: AlertService, protected override restService: RestService,  protected override router: Router, protected override tableService: TableService) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Datos Comunes'}, {label:'Resultados de bloqueo', url:'/home/datos_comunes/resultados_bloqueo'}];
  }

  ngOnInit(): void {
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

  public openDialog(row?:any, viewing?:boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.data = row ? {
      viewing,
      id: row.id,
      idPais: row.idPais,
      idCliente: row.idCliente,
      idCuenta: row.idCuenta,
      idSubcuenta: row.idSubcuenta,
      columns: this.columns,
    } : {
      columns: this.columns,
    };
    const dialogRef = this.dialog.open(ResultadoBloqueoComponent, dialogConfig);
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
    this.restService.delete(this.getCrudName(), {id: event.row.id, idPais: event.row.idPais, idCliente: event.row.idCliente, idCuenta: event.row.idCuenta, idSubcuenta: event.row.idSubcuenta}).pipe(
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
    return "ecd.resultados_bloqueo";
  }

  protected getCrudName(): string {
    return "resultadoBloqueo";
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  } 

}
