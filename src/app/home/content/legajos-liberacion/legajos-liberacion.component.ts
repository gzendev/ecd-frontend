import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { BaseCrudComponent } from '../base-crud.component';
import { LegajoLiberacionComponent } from './legajo-liberacion/legajo-liberacion.component';

@Component({
  selector: 'app-legajos-liberacion',
  templateUrl: './legajos-liberacion.component.html',
  styleUrls: ['./legajos-liberacion.component.scss']
})
export class LegajosLiberacionComponent extends BaseCrudComponent implements OnInit {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, protected override alertService: AlertService, protected override restService: RestService,  protected override router: Router, protected override tableService: TableService) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Consultas'}, {label:'Legajos Liberacion', url:'/home/consultas/legajos_liberacion'}];
  }

  ngOnInit(): void {
    this.useLocationFiltersMetadata();
    super.init().subscribe(() => {
      this.showV=true;
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
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.data = row ? {
      viewing,
      id: row.id,
      idPais: row.idPais,
      idCliente: row.idCliente,
      idCuenta: row.idCuenta,
      idSubcuenta: row.idSubcuenta
    } : {};
    const dialogRef = this.dialog.open(LegajoLiberacionComponent, dialogConfig);
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
    return "ecd.legajos_liberacion";
  }

  protected getCrudName(): string {
    return "legajosLiberacion";
  }

   protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  }

}
