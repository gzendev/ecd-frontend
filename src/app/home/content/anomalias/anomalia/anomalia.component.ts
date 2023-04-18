import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isString } from 'lodash-es';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { Anomalia } from 'src/app/model/anomalia.model';
import { Pais } from 'src/app/model/pais.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-anomalia',
  templateUrl: './anomalia.component.html',
  styleUrls: ['./anomalia.component.scss']
})
export class AnomaliaComponent implements OnInit {

  public anomalia!: Anomalia;
  public anomaliaLogKey: any;
  public paises!: Pais[]
  public viewing!: boolean;
  public creating!: boolean;
  public compareId = Helpers.compareId;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  public columns!: Column[];
  public placeholders: string[] = [];
  
  constructor(private restService: RestService, private dialogRef: MatDialogRef<AnomaliaComponent>,@Inject(MAT_DIALOG_DATA) private dialogData: any, private alertService: AlertService) { }

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.creating = this.dialogData.id && this.dialogData.idPais || this.dialogData.id == 0 && this.dialogData.idPais ? false : true;
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadAnomalia().pipe(
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

  public createAnomalia(): void {
    this.restService.create('anomalias', {
      activo: this.anomalia.activo,
      usuarioUltimaModificacion: this.anomalia.usuarioUltimaModificacion,
      id: this.anomalia.id,
      descripcion: this.anomalia.descripcion,
      idPais: this.anomalia.pais.id,
      fechaUltimaModificacion: this.anomalia.fechaUltimaModificacion
    }).subscribe((anomaliaData) => {
      this.dialogRef.close(new Anomalia(this.anomalia));
      console.log("Anomalia: ", this.anomalia)
    }, (err) => {
      this.alertService.danger(err)
    })
  }

  public updateAnomalia(): void {
    this.restService.update('anomalias', {
      activo: this.anomalia.activo,
      usuarioUltimaModificacion: this.anomalia.usuarioUltimaModificacion,
      id: this.anomalia.id,
      descripcion: this.anomalia.descripcion,
      idPais: this.anomalia.pais.id,
      fechaUltimaModificacion: this.anomalia.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.anomalias' })
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

  private loadAnomalia(): Observable<void> {
    if (this.creating) {
      this.anomalia = new Anomalia({activo: true});
      return of(null as any);
    }
    return this.restService.get('anomalias', {
      id: this.dialogData.id, 
      idPais: this.dialogData.idPais
    }).pipe(
      mergeMap((anomaliaData) => {
        this.anomalia = new Anomalia(anomaliaData);
        this.anomalia.pais = new Pais();
        this.anomalia.pais.id = this.anomalia.idPais;
        this.anomaliaLogKey = {id: this.anomalia.id, idPais: this.anomalia.pais.id};
        // if (this.anomalia.pais) {
        //   this.anomalia.pais != this.paises.find(pais => pais.id === this.anomalia.pais.id);
        // }
        return of(null as any);
      })
    );
  }

}
