import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNil, isString } from 'lodash';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { ModoEntrega } from 'src/app/model/modo-entrega.model';
import { Pais } from 'src/app/model/pais.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-modo-entrega',
  templateUrl: './modo-entrega.component.html',
  styleUrls: ['./modo-entrega.component.scss']
})
export class ModoEntregaComponent implements OnInit {

  public modoEntrega!: ModoEntrega;
  public modoEntregaLogKey: any;
  public paises!: Pais[]
  public viewing!: boolean;
  public creating!: boolean;
  public displayFullDescription = Helpers.displayFullDescription;
  public compareId = Helpers.compareId;
  public loading = true;
  public columns!: Column[];
  public placeholders: string[] = [];

  constructor(private restService: RestService, private dialogRef: MatDialogRef<ModoEntregaComponent>,@Inject(MAT_DIALOG_DATA) private dialogData: any, private alertService: AlertService) { }

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.creating = this.dialogData.id && this.dialogData.idPais || this.dialogData.id == 0 && this.dialogData.idPais ? false : true;
    this.loadModoEntrega().pipe(
      mergeMap(() => {
        return this.loadPais();
      })).subscribe(
        () => {
          this.loading = false;
        },
        (err: string | { html: string; }) => {
          this.alertService.danger(err);
        }
      );
  }

  public createModoEntrega(): void {
    this.restService.create('modoEntrega', {
      activo: this.modoEntrega.activo,
      usuarioUltimaModificacion: this.modoEntrega.usuarioUltimaModificacion,
      id: this.modoEntrega.id,
      descripcion: this.modoEntrega.descripcion,
      idPais: this.modoEntrega.pais.id,
      fechaUltimaModificacion: this.modoEntrega.fechaUltimaModificacion
    }).subscribe((modoEntregaData) => {
      this.dialogRef.close(new ModoEntrega(this.modoEntrega));
      console.log("Modo de Entrega: ", this.modoEntrega)
    }, (err) => {
      this.alertService.danger(err)
    })
  }

  public updateModoEntrega(): void {
    this.restService.update('modoEntrega', {
      activo: this.modoEntrega.activo,
      usuarioUltimaModificacion: this.modoEntrega.usuarioUltimaModificacion,
      id: this.modoEntrega.id,
      descripcion: this.modoEntrega.descripcion,
      idPais: this.modoEntrega.pais.id,
      fechaUltimaModificacion: this.modoEntrega.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }
  
  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.modo_entrega' })
      .pipe(
        mergeMap((paisesData) => {
          this.paises = paisesData.map((paisData) => {
            return new Pais(paisData);
          });
          return of(null as any);
        })
      );
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

  private loadModoEntrega(): Observable<void> {
    if (this.creating) {
      this.modoEntrega = new ModoEntrega({activo: true});
      return of(null as any);
    }
    return this.restService.get('modoEntrega', {
      id: this.dialogData.id,
      idPais: this.dialogData.idPais,
    }).pipe(
      mergeMap((modoEntregaData) => {
        this.modoEntrega = new ModoEntrega(modoEntregaData);
        this.modoEntrega.pais = new Pais();
        this.modoEntrega.pais.id = this.modoEntrega.idPais;
        this.modoEntregaLogKey = {id: this.modoEntrega.id, idPais: this.modoEntrega.pais.id};
        // if (this.modoEntrega.pais) {
        //   this.modoEntrega.pais != this.paises.find(pais => pais.id === this.modoEntrega.pais.id);
        // }
        return of(null as any);
      })
    );
  }

}
