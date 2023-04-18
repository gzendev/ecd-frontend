import { Cliente } from 'src/app/model/cliente.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { Pais } from 'src/app/model/pais.model';
import { Refacturacion } from 'src/app/model/refacturacion.model';
import { Subcuenta } from 'src/app/model/subcuenta.model';
import { Helpers } from 'src/app/utils/helpers';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CertificadoImpreso } from 'src/app/model/certificado-impreso.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-refacturacion',
  templateUrl: './refacturacion.component.html',
  styleUrls: ['./refacturacion.component.scss']
})
export class RefacturacionComponent implements OnInit {

  public refacturacion!: Refacturacion;
  public refacturacionLogKey: any;
  public paises: Pais[] = [];
  public clientes!: Cliente[];
  public cuentas!: Cuenta[];
  public subcuentas!: Subcuenta[];
  public compareId = Helpers.compareId;
  public displayFullDescription = Helpers.displayFullDescription;
  public viewing!: boolean;
  public creating!: boolean;
  public loading = true;

  constructor(
    private alertService: AlertService,
    private restService: RestService,
    private dialogRef: MatDialogRef<RefacturacionComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  public ngOnInit(): void {
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.creating = this.dialogData.id && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta && this.dialogData.idSubcuenta ? false : true;
    this.loadRefacturacion()
      .pipe(
        mergeMap(() => {
          return this.loadPais();
        }),
      )
      .subscribe(
        () => {
          this.loading = false;
        },
        (err: string | { html: string }) => {
          this.alertService.danger(err);
        }
      );
  }

  public loadPais(): Observable<void> {
    return this.restService
      .find('pais', { funcionId: 'ecd.refacturacion' })
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
    if ($event.value) {
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.refacturacion' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.refacturacion' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        return of(null as any);
      })
    }
  }

  public loadCuenta($event: any): any {
    if ($event.value) {
      this.restService.find('cuenta', { idCliente: $event.value.id, funcionId: 'ecd.refacturacion' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('cuenta', { idCliente: $event, funcionId: 'ecd.refacturacion' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        return of(null as any);
      })
    }
  }

  public loadSubcuenta($event: any): any {
    if ($event.value) {
      this.restService.find('subcuenta', { idCliente: this.refacturacion.cliente.id, idCuenta: $event.value.id, funcionId: 'ecd.refacturacion' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('subcuenta', { idCliente: $event.idCliente, idCuenta: $event.idCuenta, funcionId: 'ecd.refacturacion' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        return of(null as any);
      })
    }
  }

  private loadRefacturacion(): Observable<void> {
    return this.restService
      .get('refacturacion', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idCuenta: this.dialogData.idCuenta,
        idSubcuenta: this.dialogData.idSubcuenta
      })
      .pipe(
        mergeMap((refacturacionData) => {
          this.loadCliente(refacturacionData.idPais);
          this.loadCuenta(refacturacionData.idCliente);
          this.loadSubcuenta({idCliente: refacturacionData.idCliente, idCuenta: refacturacionData.idCuenta});
          this.refacturacion = new Refacturacion(refacturacionData);
          this.refacturacion.pais = new PaisCombo();
          this.refacturacion.cliente = new Cliente();
          this.refacturacion.cuenta = new Cuenta();
          this.refacturacion.subcuenta = new Subcuenta();
          this.refacturacion.pais.id = this.refacturacion.idPais;
          this.refacturacion.cliente.id = this.refacturacion.idCliente;
          this.refacturacion.cuenta.id = this.refacturacion.idCuenta;
          this.refacturacion.subcuenta.id = this.refacturacion.idSubcuenta;
          this.refacturacionLogKey = {id: this.refacturacion.id, idPais: this.refacturacion.pais.id, idCliente: this.refacturacion.cliente.id, idCuenta: this.refacturacion.cuenta.id, idSubcuenta: this.refacturacion.subcuenta.id};
          // if (this.certificadoImpreso.pais) {
          //   this.certificadoImpreso.pais !=
          //     this.paises.find(
          //       (pais) => pais.id === this.certificadoImpreso.pais.id
          //     );
          // }
          return of(null as any);
        })
      );

      // .pipe(
      //   mergeMap((resultadoBloqueoData) => {
      //     this.resultadoBloqueo = new ResultadoBloqueo(resultadoBloqueoData);
      //     this.resultadoBloqueoLogKey = {id: this.resultadoBloqueo.id, paisId: this.resultadoBloqueo.pais.id, clienteId: this.resultadoBloqueo.cliente.id, cuentaId: this.resultadoBloqueo.cuenta.id, subcuentaId: this.resultadoBloqueo.subcuenta.id};
      //     if (this.resultadoBloqueo.pais && this.resultadoBloqueo.cliente && this.resultadoBloqueo.cuenta && this.resultadoBloqueo.subcuenta) {
      //       this.resultadoBloqueo.pais != this.paises.find(pais => pais.id === this.resultadoBloqueo.pais.id);
      //       this.resultadoBloqueo.cliente != this.clientes.find(cliente => cliente.id === this.resultadoBloqueo.cliente.id);
      //       this.resultadoBloqueo.cuenta != this.cuentas.find(cuenta => cuenta.id === this.resultadoBloqueo.cuenta.id);
      //       this.resultadoBloqueo.subcuenta != this.subcuentas.find(subcuenta => subcuenta.id === this.resultadoBloqueo.subcuenta.id);
      //     }
      //     return of(null as any);
      //   })
      // );

  }

}
