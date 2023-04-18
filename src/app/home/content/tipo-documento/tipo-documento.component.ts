import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BaseCrudComponent } from '../base-crud.component';
import { TipoDocumentosComponent } from './tipo-documentos/tipo-documentos.component';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { Column, RowActionEvent } from 'src/app/gefco/gefco-table/gefco-table.component';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent extends BaseCrudComponent implements OnInit {

  public columns: Column[] = [];

  constructor( private dialog: MatDialog, protected override alertService: AlertService, protected override restService: RestService,  protected override router: Router, protected override tableService: TableService) {
    super(alertService, restService, router , tableService);
    this.breadcrumb = [{label: 'Datos Comunes'}, {label:'Tipo de documento', url:'/home/datos_comunes/tipo_documento'}];
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
    dialogConfig.autoFocus = true;
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
    const dialogRef = this.dialog.open(TipoDocumentosComponent, dialogConfig);
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
    return "ecd.tipo_documento";
  }

  protected getCrudName(): string {
    return "tipoDocumento";
  }

    protected loadFiltersMetadata(): Observable<void> {
    return of(null as any);
  } 
}
