import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { EMPTY, mergeMap, Observable, of} from 'rxjs';
import {  Pais } from 'src/app/model/pais.model';
import { EstadoLegajo } from 'src/app/model/estado-legajo.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';
import { isNil, isString } from 'lodash-es';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';

@Component({
  selector: 'app-estado-legajo-dialog',
  templateUrl: './estado-legajo-dialog.component.html',
  styleUrls: ['./estado-legajo-dialog.component.scss']
})
export class EstadoLegajoComponent implements OnInit {
  
  public estadoLegajo !: EstadoLegajo;
  public estadoLegajoLogKey: any;
  public paises!: Pais[]
  public viewing!: boolean;
  public creating!: boolean;
  public showActivo!: boolean;
  public compareId = Helpers.compareId;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  public columns!: Column[];
  public placeholders: string[] = [];

  constructor(private restService: RestService, private dialogRef: MatDialogRef<EstadoLegajoComponent>,@Inject(MAT_DIALOG_DATA) private dialogData: any, private alertService: AlertService) { }

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.creating = this.dialogData.id && this.dialogData.idPais || this.dialogData.id && this.dialogData.idPais == 0 || this.dialogData.id == 0 && this.dialogData.idPais ? false : true;
    if(this.dialogData.id && this.dialogData.idPais) {
      console.log('Es verdad!', )
    } else {
      console.log('No lo es!!')
    }
    console.log(this.dialogData.id)
    console.log(this.dialogData.idPais)
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadEstadoLegajo().pipe(
      mergeMap(() => {
        return this.loadPais();
      })
    ).subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
}

  public createEstadoLegajo(): void {

    this.restService.create('estadoLegajo', 
    {
      activo: this.estadoLegajo.activo,
      usuarioUltimaModificacion: this.estadoLegajo.usuarioUltimaModificacion,
      id: this.estadoLegajo.id,
      descripcion: this.estadoLegajo.descripcion,
      idPais: this.estadoLegajo.pais.id,
      fechaUltimaModificacion: this.estadoLegajo.fechaUltimaModificacion
    }
    ).subscribe((estadoLegajoData) => {
      this.dialogRef.close(new EstadoLegajo(this.estadoLegajo));
    }, (err) => {
      this.alertService.danger(err);
    })
  }
 
  public updateEstadoLegajo(): void {
    this.restService.update('estadoLegajo', 
    {
      activo: this.estadoLegajo.activo,
      usuarioUltimaModificacion: this.estadoLegajo.usuarioUltimaModificacion,
      id: this.estadoLegajo.id,
      descripcion: this.estadoLegajo.descripcion,
      idPais: this.estadoLegajo.pais.id,
      fechaUltimaModificacion: this.estadoLegajo.fechaUltimaModificacion
    }
    ).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  } 

  public loadPais(): Observable<void> {
    console.log('Carga pais...')
    return this.restService
      .find('pais', { funcionId: 'ecd.estado_legajo' })
      .pipe(
        mergeMap((paisesData) => {
          console.log(paisesData)
          this.paises = paisesData.map((paisData) => {
            console.log('entre aqui')
            return new Pais(paisData);
          });
          console.log('entre pero devuelvo null')
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

  private loadEstadoLegajo(): Observable<void> {
    console.log(this.creating)
    if (this.creating) {
      this.estadoLegajo = new EstadoLegajo({activo: true});
      return of(null as any);
    }
    console.log('ID', this.dialogData.id)
    console.log('PAIS', this.dialogData.idPais)
    return this.restService.get("estadoLegajo", {id: this.dialogData.id , idPais: this.dialogData.idPais}).pipe(
      mergeMap((estadoLegajoData) => {
        console.log(estadoLegajoData)
        this.estadoLegajo = new EstadoLegajo(estadoLegajoData);
        this.estadoLegajo.pais= new PaisCombo()
        this.estadoLegajo.pais.id = this.estadoLegajo.idPais
        this.estadoLegajoLogKey = {id: this.estadoLegajo.id, idPais: this.estadoLegajo.idPais};
        return of(null as any); 
      })
    );
  }
}
