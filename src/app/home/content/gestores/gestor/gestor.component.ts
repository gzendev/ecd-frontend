import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isString } from 'lodash-es';
import { AlertService } from 'ngx-alerts';
import { mergeMap, Observable, of } from 'rxjs';
import { Column } from 'src/app/gefco/gefco-table/gefco-table.component';
import { Cliente } from 'src/app/model/cliente.model';
import { Concesionario } from 'src/app/model/concesionario.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { Gestor } from 'src/app/model/gestor.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {

  public gestor!: Gestor;
  public gestorLogKey: any;
  public paises: Pais[] = [];
  public clientes: Cliente[] = [];
  public cuentas: Cuenta[] = [];
  public codigos: Concesionario[] = [];
  public viewing!: boolean;
  public creating!: boolean;
  public compareId = Helpers.compareId;
  public displayFullDescription = Helpers.displayFullDescription;
  public loading = true;
  public columns: Column[] = [];
  public placeholders: string[] = [];
  public mostrar: boolean = true;
  public mostrar1: boolean = true;
  public mostrar2: boolean = true;
  
  constructor(
    private restService: RestService,
    private dialogRef: MatDialogRef<GestorComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.columns = this.dialogData.columns
    this.columns.forEach((column) => {
      this.placeholders.push(column.header)
    })
    this.creating = this.dialogData.id && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta || this.dialogData.id == 0 && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta ? false : true;
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadGestor()
      .pipe(
        mergeMap(() => {
          return this.loadPais();
        })
      )
      .subscribe(
        () => {
          this.loading = false;
        },
        (err: string | { html: string; }) => {
          this.alertService.danger(err);
        }
      );
  }

  public createGestor(): void {
    let codigosConcesionarios: string[] = []; 
    this.gestor.cod_concesionario.forEach((codigo) => {
          codigosConcesionarios.push(codigo.id);     
    })
    if (this.gestor.descripcion === undefined){
      this.gestor.descripcion = "";
    }
    this.restService
      .create('gestores', {
        activo: this.gestor.activo,
        usuarioUltimaModificacion: this.gestor.usuarioUltimaModificacion,
        id: this.gestor.id,
        descripcion: this.gestor.descripcion,
        idPais: this.gestor.pais.id,
        idCliente: this.gestor.cliente.id,
        idCuenta: this.gestor.cuenta.id,
        idConcesionarios: codigosConcesionarios,
        fechaUltimaModificacion: this.gestor.fechaUltimaModificacion
      })
      .subscribe(
        (gestorData) => {
          this.dialogRef.close(new Gestor(this.gestor));
          console.log('Gestor: ', this.gestor);
        },
        (err) => {
          this.alertService.danger(err);
          console.log('error create: ', this.gestor);

        }
      );
  }

  public updateGestor(): void {
    let codigosConcesionarios: string[] = []; 
    this.gestor.idConcesionarios.forEach((codigo) => {
          codigosConcesionarios.push(codigo);
    })
    this.restService.update('gestores', {
      activo: this.gestor.activo,
      usuarioUltimaModificacion: this.gestor.usuarioUltimaModificacion,
      id: this.gestor.id,
      descripcion: this.gestor.descripcion,
      idPais: this.gestor.pais.id,
      idCliente: this.gestor.cliente.id,
      idCuenta: this.gestor.cuenta.id,
      idConcesionarios: codigosConcesionarios,
      fechaUltimaModificacion: this.gestor.fechaUltimaModificacion
    }).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.gestores' })
      .pipe(
        mergeMap((paisesData) => {
          this.paises = paisesData.map((paisData) => {
            return new Pais(paisData);
          });
          return of(null as any);
        })
      );
  }

  public loadCliente($event: any): any {
    this.mostrar = false;
    if ($event.value) {
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.gestores' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.gestores' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        this.mostrar = true;
        return of(null as any);
      })
    }
  }

  public loadCuenta($event: any): any {
    this.mostrar1 = false;
    if ($event.value) {
      this.restService.find('cuenta', { idCliente: $event.value.id, funcionId: 'ecd.gestores' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    } else {
      this.restService.find('cuenta', { idCliente: $event, funcionId: 'ecd.gestores' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        this.mostrar1 = true;
        return of(null as any);
      })
    }
  }

  public loadConcesionarios($event: any): any {
    this.mostrar2 = false;
    if ($event.value) {
      this.restService.find('concesionariosEnte', {
        id: this.gestor.id, 
        idPais: this.gestor.pais.id,
        idCliente: this.gestor.cliente.id
      }).subscribe((codigosData) => {
        this.codigos = codigosData.map((codigoData) => {
          return new Concesionario(codigoData);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    } else {
      this.restService.find('concesionariosEnte', {
        id: $event.id, 
        idPais: $event.idPais,
        idCliente: $event.idCliente
      }).subscribe((codigosData) => {
        this.codigos = codigosData.map((codigoData) => {
          return new Concesionario(codigoData);
        });
        this.mostrar2 = true;
        return of(null as any);
      })
    }
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
  
  private loadGestor(): Observable<void> {
    if (this.creating) {
      this.gestor = new Gestor({activo: true});
      return of(null as any);
    }
    return this.restService.get('gestores', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idCuenta: this.dialogData.idCuenta,
      })
      .pipe(
        mergeMap((gestorData) => {
          this.loadCliente(gestorData.idPais);
          this.loadCuenta(gestorData.idCliente);
          this.loadConcesionarios({
            id: gestorData.id,
            idPais: gestorData.idPais,
            idCliente: gestorData.idCliente
          });
          this.gestor = new Gestor(gestorData);
          this.gestor.pais = new PaisCombo();
          this.gestor.cliente = new Cliente();
          this.gestor.cuenta = new Cuenta();
          this.gestor.cod_concesionario = new Array<Concesionario>();
          this.gestor.pais.id = this.gestor.idPais;
          this.gestor.cliente.id = this.gestor.idCliente;
          this.gestor.cuenta.id = this.gestor.idCuenta;
          this.gestor.idConcesionarios.forEach((data) => {
            let dataCon = {
              id: data,
              descripcion: ''
            }
            this.gestor.cod_concesionario.push(new Concesionario(dataCon))
          })
          this.gestorLogKey = {id: this.gestor.id, idPais: this.gestor.pais.id, idCliente: this.gestor.cliente.id, idCuenta: this.gestor.cuenta.id};
          // if (this.gestor.pais && this.gestor.cliente && this.gestor.cuenta) {
          //   this.gestor.pais != this.paises.find(pais => pais.id === this.gestor.pais.id);
          //   this.gestor.cliente != this.clientes.find(cliente => cliente.id === this.gestor.cliente.id);
          //   this.gestor.cuenta != this.cuentas.find(cuenta => cuenta.id === this.gestor.cuenta.id);
          // }
          return of(null as any);
        })
      );
  }

}
