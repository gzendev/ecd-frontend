import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CertificadoImpreso } from 'src/app/model/certificado-impreso.model';
import { Cliente } from 'src/app/model/cliente.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { Subcuenta } from 'src/app/model/subcuenta.model';
import { TipoProveedor } from 'src/app/model/tipo-proveedor.model';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-certificado-impreso',
  templateUrl: './certificado-impreso.component.html',
  styleUrls: ['./certificado-impreso.component.scss'],
})
export class CertificadoImpresoComponent implements OnInit {
  
  public certificadoImpreso!: CertificadoImpreso;
  public certificadoImpresoLogKey: any;
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
    private dialogRef: MatDialogRef<CertificadoImpresoComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  public ngOnInit(): void {
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.creating = this.dialogData.id && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta && this.dialogData.idSubcuenta ? false : true;
    this.loadCertificadoImpreso()
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
      .find('pais', { funcionId: 'ecd.certificados_impresos' })
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
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.certificados_impresos' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.certificados_impresos' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        return of(null as any);
      })
    }
  }

  public loadCuenta($event: any): any {
    if ($event.value) {
      this.restService.find('cuenta', { idCliente: $event.value.id, funcionId: 'ecd.certificados_impresos' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('cuenta', { idCliente: $event, funcionId: 'ecd.certificados_impresos' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        return of(null as any);
      })
    }
  }

  public loadSubcuenta($event: any): any {
    if ($event.value) {
      this.restService.find('subcuenta', { idCliente: this.certificadoImpreso.cliente.id, idCuenta: $event.value.id, funcionId: 'ecd.certificados_impresos' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('subcuenta', { idCliente: $event.idCliente, idCuenta: $event.idCuenta, funcionId: 'ecd.certificados_impresos' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        return of(null as any);
      })
    }
  }

  private loadCertificadoImpreso(): Observable<void> {
    return this.restService
      .get('certificadosImpresos', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idCuenta: this.dialogData.idCuenta,
        idSubcuenta: this.dialogData.idSubcuenta
      })
      .pipe(
        mergeMap((certificadoImpresoData) => {
          this.loadCliente(certificadoImpresoData.idPais);
          this.loadCuenta(certificadoImpresoData.idCliente);
          this.loadSubcuenta({idCliente: certificadoImpresoData.idCliente, idCuenta: certificadoImpresoData.idCuenta});
          this.certificadoImpreso = new CertificadoImpreso(certificadoImpresoData);
          this.certificadoImpreso.pais = new PaisCombo();
          this.certificadoImpreso.cliente = new Cliente();
          this.certificadoImpreso.cuenta = new Cuenta();
          this.certificadoImpreso.subcuenta = new Subcuenta();
          this.certificadoImpreso.pais.id = this.certificadoImpreso.idPais;
          this.certificadoImpreso.cliente.id = this.certificadoImpreso.idCliente;
          this.certificadoImpreso.cuenta.id = this.certificadoImpreso.idCuenta;
          this.certificadoImpreso.subcuenta.id = this.certificadoImpreso.idSubcuenta;
          this.certificadoImpresoLogKey = {id: this.certificadoImpreso.id, idPais: this.certificadoImpreso.pais.id, idCliente: this.certificadoImpreso.cliente.id, idCuenta: this.certificadoImpreso.cuenta.id, idSubcuenta: this.certificadoImpreso.subcuenta.id};
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
