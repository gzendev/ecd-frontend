import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TableService } from 'src/app/services/table.service';
import { RestService } from 'src/app/services/rest.service';
import { BaseCrudComponent } from '../base-crud.component';
import { ConcesionarioEnteComponent } from './concesionario-ente/concesionario-ente.component';
import { mergeMap } from 'rxjs/operators';
import { Column, RowActionEvent } from 'src/app/gefco/gefco-table/gefco-table.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-concesionarios-ente',
  templateUrl: './concesionarios-ente.component.html'
})
export class ConcesionariosEnteComponent extends BaseCrudComponent implements OnInit {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, protected override alertService: AlertService, protected override restService: RestService,  protected override router: Router, protected override tableService: TableService) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Datos Comunes'}, {label:'Concesionarios-Ente', url:'/home/datos_comunes/concesionario_ente'}];
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
      columns: this.columns,
    } : {
      columns: this.columns
    };
    const dialogRef = this.dialog.open(ConcesionarioEnteComponent, dialogConfig);
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
    this.restService.delete(this.getCrudName(), {id: event.row.id, idPais: event.row.idPais, idCliente: event.row.idCliente}).pipe(
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
    return "ecd.concesionarios_ente";
  }

  protected getCrudName(): string {
    return "concesionariosEnte";
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  } 

}
