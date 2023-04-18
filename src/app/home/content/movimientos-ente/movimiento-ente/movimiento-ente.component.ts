import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { mergeMap, Observable, of } from 'rxjs';
import { MovimientoEnte } from 'src/app/model/movimiento-ente.model';
import { Pais } from 'src/app/model/pais.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { isString } from 'lodash-es';

@Component({
  selector: 'app-movimiento-ente',
  templateUrl: './movimiento-ente.component.html',
  styleUrls: ['./movimiento-ente.component.scss']
})
export class MovimientoEnteComponent implements OnInit {

  public movimientoEnte!: MovimientoEnte;
  public movimientoEnteLogKey: any;
  public paises!: Pais[]
  public viewing!: boolean;
  public creating!: boolean;
  public displayFullDescription = Helpers.displayFullDescription;
  public compareId = Helpers.compareId;
  public loading = true;
  public columns!: Column[];
  public placeholders: string[] = [];

  constructor(private restService: RestService, private dialogRef: MatDialogRef<MovimientoEnteComponent>,@Inject(MAT_DIALOG_DATA) private dialogData: any, private alertService: AlertService) { }

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.creating = this.dialogData.id && this.dialogData.idPais || this.dialogData.id == 0 && this.dialogData.idPais ? false : true;
    this.loadMovimientoEnte().pipe(
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

  public createMovimientoEnte(): void {
    this.restService.create('movimientosEnte', {
      activo: this.movimientoEnte.activo,
      usuarioUltimaModificacion: this.movimientoEnte.usuarioUltimaModificacion,
      id: this.movimientoEnte.id,
      descripcion: this.movimientoEnte.descripcion,
      idPais: this.movimientoEnte.pais.id,
      fechaUltimaModificacion: this.movimientoEnte.fechaUltimaModificacion
    }).subscribe((movimientoEnteData) => {
      this.dialogRef.close(new MovimientoEnte(this.movimientoEnte));
      console.log("Movimiento Ente: ", this.movimientoEnte)
    }, (err) => {
      this.alertService.danger(err);
    })
  }

  public updateMovimientoEnte(): void {
    this.restService.update('movimientosEnte', {
      activo: this.movimientoEnte.activo,
      usuarioUltimaModificacion: this.movimientoEnte.usuarioUltimaModificacion,
      id: this.movimientoEnte.id,
      descripcion: this.movimientoEnte.descripcion,
      idPais: this.movimientoEnte.pais.id,
      fechaUltimaModificacion: this.movimientoEnte.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.movimientos_ente' })
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
  
  private loadMovimientoEnte(): Observable<void> {
    if (this.creating) {
      this.movimientoEnte = new MovimientoEnte({activo: true});
      return of(null as any);
    }
    return this.restService.get('movimientosEnte', {
      id: this.dialogData.id, 
      idPais: this.dialogData.idPais
    }).pipe(
      mergeMap((movimientoEnteData) => {
        this.movimientoEnte = new MovimientoEnte(movimientoEnteData);
        this.movimientoEnte.pais = new Pais();
        this.movimientoEnte.pais.id = this.movimientoEnte.idPais;
        this.movimientoEnteLogKey = {id: this.movimientoEnte.id, idPais: this.movimientoEnte.pais.id};
        // if (this.movimientoEnte.pais) {
        //   this.movimientoEnte.pais != this.paises.find(pais => pais.id === this.movimientoEnte.pais.id);
        // }
        return of(null as any);
      })
    );
  }

}

