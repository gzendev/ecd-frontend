import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { BaseCrudComponent } from '../base-crud.component';
import { HistoricoLegajoAnomaliaComponent } from './historico-legajo-anomalia/historico-legajo-anomalia.component';

@Component({
  selector: 'app-historicos-legajos-anomalias',
  templateUrl: './historicos-legajos-anomalias.component.html',
  styleUrls: ['./historicos-legajos-anomalias.component.scss']
})
export class HistoricosLegajosAnomaliasComponent extends BaseCrudComponent implements OnInit, OnDestroy {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, 
               protected override alertService: AlertService, 
               protected override restService: RestService,  
               protected override router: Router, 
               protected override tableService: TableService ) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Consultas'}, {label:'Historicos Legajos Movimientos', url:'/home/consultas/historico_legajos'}, {label:'Historicos Legajos Anomalias', url:'/home/consultas/historico_legajos_anomalia'}];
  }

  ngOnInit(): void {
    
    if(localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data')!);
      this.data = data;
    }
    
    super.init().subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('data');
  }

  public onColumn(event: Column[]): void {
    this.columns = event;
  }

  public openDialog(row?: any, viewing?: boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
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
    const dialogRef = this.dialog.open(HistoricoLegajoAnomaliaComponent, dialogConfig);
    dialogRef.afterClosed().pipe(
      mergeMap(() => {
        return this.loadRows();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      console.log(err);
      this.alertService.danger(err);
    });
  }

  // public onDeleteRow(event: RowActionEvent): void {
  //   this.restService.delete(this.getCrudName(), {
  //     id: event.row.id, 
  //     paisId: event.row.paisId,
  //     // clienteId: event.row.clienteId,
  //     // cuentaId: event.row.cuentaId,
  //     // subcuentaId: event.row.subcuentaId
  //   }).pipe(
  //     mergeMap(() => {
  //       event.observer.next(false);
  //       return this.loadRows();
  //     })
  //   ).subscribe(() => {
  //     // Nothing to do...
  //   }, (err) => {
  //     this.alertService.danger(err);
  //   });
  // }

  protected getFunctionId(): string {
    return "ecd.historico_legajos.anomalias_hist_legajos";
  }

  protected getCrudName(): string {
    return "historiaLegajoAnomalias";
  }

   protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  }

}
