import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mergeMap, Observable, of } from 'rxjs';
import { Cliente } from 'src/app/model/cliente.model';
import { Cuenta } from 'src/app/model/cuenta.model';
import { LegajoLiberacion } from 'src/app/model/legajo-liberacion.model';
import { PaisCombo } from 'src/app/model/pais-combo.model';
import { Pais } from 'src/app/model/pais.model';
import { Subcuenta } from 'src/app/model/subcuenta.model';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-legajo-liberacion',
  templateUrl: './legajo-liberacion.component.html',
  styleUrls: ['./legajo-liberacion.component.scss']
})
export class LegajoLiberacionComponent implements OnInit {

  public legajoLiberacion!: LegajoLiberacion;
  public legajoLiberacionLogKey: any;
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
    private dialogRef: MatDialogRef<LegajoLiberacionComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
    ) { }

  ngOnInit(): void {
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.creating = this.dialogData.id && this.dialogData.idPais && this.dialogData.idCliente && this.dialogData.idCuenta && this.dialogData.idSubcuenta ? false : true;
    this.loadlegajoLiberacion()
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
      this.restService.find('cliente', { idPais: $event.value.id, funcionId: 'ecd.ResultadosBloqueo' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('cliente', { idPais: $event, funcionId: 'ecd.ResultadosBloqueo' }).subscribe((clienteData) => {
        this.clientes = clienteData.map((datos) => {
          return new Cliente(datos);
        });
        return of(null as any);
      })
    }
  }

  public loadCuenta($event: any): any {
    if ($event.value) {
      this.restService.find('cuenta', { idCliente: $event.value.id, funcionId: 'ecd.ResultadosBloqueo' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('cuenta', { idCliente: $event, funcionId: 'ecd.ResultadosBloqueo' }).subscribe((cuentaData) => {
        this.cuentas = cuentaData.map((datos) => {
          return new Cuenta(datos);
        });
        return of(null as any);
      })
    }
  }

  public loadSubcuenta($event: any): any {
    if ($event.value) {
      this.restService.find('subcuenta', { idCliente: this.legajoLiberacion.cliente.id, idCuenta: $event.value.id, funcionId: 'ecd.ResultadosBloqueo' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        return of(null as any);
      })
    } else {
      this.restService.find('subcuenta', { idCliente: $event.idCliente, idCuenta: $event.idCuenta, funcionId: 'ecd.ResultadosBloqueo' }).subscribe((subcuentaData) => {
        this.subcuentas = subcuentaData.map((datos) => {
          return new Subcuenta(datos);
        });
        return of(null as any);
      })
    }
  }

  private loadlegajoLiberacion(): Observable<void> {
    return this.restService
      .get('certificadosImpresos', {
        id: this.dialogData.id,
        idPais: this.dialogData.idPais,
        idCliente: this.dialogData.idCliente,
        idCuenta: this.dialogData.idCuenta,
        idSubcuenta: this.dialogData.idSubcuenta
      })
      .pipe(
        mergeMap((legajoLiberacionData) => {
          this.loadCliente(legajoLiberacionData.idPais);
          this.loadCuenta(legajoLiberacionData.idCliente);
          this.loadSubcuenta({idCliente: legajoLiberacionData.idCliente, idCuenta: legajoLiberacionData.idCuenta});
          this.legajoLiberacion = new LegajoLiberacion(legajoLiberacionData);
          this.legajoLiberacion.pais = new PaisCombo();
          this.legajoLiberacion.cliente = new Cliente();
          this.legajoLiberacion.cuenta = new Cuenta();
          this.legajoLiberacion.subcuenta = new Subcuenta();
          this.legajoLiberacion.pais.id = this.legajoLiberacion.idPais;
          this.legajoLiberacion.cliente.id = this.legajoLiberacion.idCliente;
          this.legajoLiberacion.cuenta.id = this.legajoLiberacion.idCuenta;
          this.legajoLiberacion.subcuenta.id = this.legajoLiberacion.idSubcuenta;
          this.legajoLiberacionLogKey = {id: this.legajoLiberacion.id, idPais: this.legajoLiberacion.pais.id, idCliente: this.legajoLiberacion.cliente.id, idCuenta: this.legajoLiberacion.cuenta.id, idSubcuenta: this.legajoLiberacion.subcuenta.id};
          // if (this.legajoLiberacion.pais) {
          //   this.legajoLiberacion.pais !=
          //     this.paises.find(
          //       (pais) => pais.id === this.legajoLiberacion.pais.id
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
