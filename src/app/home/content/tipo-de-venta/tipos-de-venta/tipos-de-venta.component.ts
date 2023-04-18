import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNil, isString } from 'lodash';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { Venta } from 'src/app/model/venta.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-tipos-de-venta',
  templateUrl: './tipos-de-venta.component.html',
  styleUrls: ['./tipos-de-venta.component.scss']
})
export class TiposDeVentaComponent implements OnInit {
  
  public ventas !: Venta;
  public ventasLogKey: any;
  public paises!: Pais[];
  public paisesCombo!: PaisCombo[];
  public viewing!: boolean;
  public creating!: boolean;
  public showActivo!: boolean;
  public compareId = Helpers.compareId;
  public compareIdS = Helpers.compareIdS;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  public columns!: Column[];
  public placeholders: string[] = [];

  constructor(private restService: RestService, private dialogRef: MatDialogRef<TiposDeVentaComponent>,@Inject(MAT_DIALOG_DATA) private dialogData: any, private alertService: AlertService) { }

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.creating = this.dialogData.id && this.dialogData.idPais || this.dialogData.id == 0 && this.dialogData.idPais ? false : true;
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadDocumento()
    .pipe(
      mergeMap(() => {
        return this.loadPais();
      })
 ).subscribe(
  () => {
    this.loading = false;
  },
  (err: string | { html: string; }) => {
    this.alertService.danger(err);
  }
);
}

  public createVenta(): void {
    this.restService.create('tipoVenta', {
      activo: this.ventas.activo,
      ingresoAutomatico: this.ventas.ingresoAutomatico,
        usuarioUltimaModificacion: this.ventas.usuarioUltimaModificacion,
        id: this.ventas.id,
        descripcion: this.ventas.descripcion,
        idPais: this.ventas.pais.id,
        fechaUltimaModificacion: this.ventas.fechaUltimaModificacion
    }).subscribe(
      (ventasData) => {
        this.dialogRef.close(new Venta(this.ventas));
        console.log('Venta: ', this.ventas);
      },
      (err) => {
        this.alertService.danger(err);
      }
    );
}
 
  public updateVenta(): void {
    this.restService.update('tipoVenta', {
      activo: this.ventas.activo,
      ingresoAutomatico: this.ventas.ingresoAutomatico,
      usuarioUltimaModificacion: this.ventas.usuarioUltimaModificacion,
      id: this.ventas.id,
      descripcion: this.ventas.descripcion,
      idPais: this.ventas.pais.id,
      fechaUltimaModificacion: this.ventas.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }
  
  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.tipo_venta' })
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
 
  ///METODO SOLO PARA IMPUTS SIN SELECT QUE LLENAR
  /* public loadEstadoLegajo(): Observable<void> {
    if(!this.dialogData){
      this.estadoLegajo = new EstadoLegajo({activo: true});
      this.estadoLegajoKey = null;
      return of()
    }
    return this.restService.get('tmsService/api/marca', {id: this.dialogData.estadoLegajoId}).pipe(
      mergeMap((estadoLegajoData) => {
        this.estadoLegajo = new EstadoLegajo(estadoLegajoData);
        this.estadoLegajoKey = {id: this.estadoLegajo.id};
        return of()
      })
    );
  } */
  
  private loadDocumento(): Observable<void> {
    if (this.creating) {
      this.ventas = new Venta({activo: true});
      return of(null as any);
    }
    return this.restService.get("tipoVenta", {id: this.dialogData.id , idPais: this.dialogData.idPais}).pipe(
      mergeMap((ventasData) => {
        this.ventas = new Venta(ventasData);
        this.ventas.pais = new PaisCombo();
        this.ventas.pais.id = this.ventas.idPais;
        this.ventasLogKey = {id: this.ventas.id, idPais: this.ventas.pais.id};
        /* if (this.documento.pais) {
          this.documento.pais != this.paises.find(pais => pais.id === this.documento.pais.id);
        } */
        return of(null as any); 
      })
    );
  }
}
