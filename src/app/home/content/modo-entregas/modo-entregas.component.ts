import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Column, RowActionEvent } from 'src/app/gefco/gefco-table/gefco-table.component';
import { ModoEntrega } from 'src/app/model/modo-entrega.model';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { BaseCrudComponent } from '../base-crud.component';
import { ModoEntregaComponent } from './modo-entrega/modo-entrega.component';

@Component({
  selector: 'app-modo-entregas',
  templateUrl: './modo-entregas.component.html',
  styleUrls: ['./modo-entregas.component.scss']
})
export class ModoEntregasComponent extends BaseCrudComponent implements OnInit {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, protected override alertService: AlertService, protected override restService: RestService,  protected override router: Router, protected override tableService: TableService) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Datos Comunes'}, {label:'Modo de entregas', url:'/home/datos_comunes/modos_entrega'}];
  }

  ngOnInit(): void {
    this.useLocationFiltersMetadata();
    super.init().subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    })
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
      columns: this.columns,
    } : {
      columns: this.columns,
    };
    const dialogRef = this.dialog.open(ModoEntregaComponent, dialogConfig);
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
    this.restService.delete(this.getCrudName(), {id: event.row.id, idPais: event.row.idPais}).pipe(
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
    return "ecd.modo_entrega";
  }

  protected getCrudName(): string {
    return "modoEntrega";
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  } 

}
