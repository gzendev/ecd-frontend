import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EstadoLegajosComponent } from './home/content/estado-legajos/estado-legajos.component';
import { TipoDocumentoComponent } from './home/content/tipo-documento/tipo-documento.component';
import { DocumentoTipoVentaComponent } from './home/content/documento-tipo-venta/documento-tipo-venta.component'; 
import { ConcesionariosEnteComponent } from './home/content/concesionarios-ente/concesionarios-ente.component';
import { MovimientosEnteComponent } from './home/content/movimientos-ente/movimientos-ente.component';
import { TipoDeVentaComponent } from './home/content/tipo-de-venta/tipo-de-venta.component';
import { GestoresComponent } from './home/content/gestores/gestores.component';
import { ModoEntregasComponent } from './home/content/modo-entregas/modo-entregas.component';
import { BocaEntregasComponent } from './home/content/boca-entregas/boca-entregas.component';
import { AnomaliasComponent } from './home/content/anomalias/anomalias.component';
import { ResultadosBloqueoComponent } from './home/content/resultados-bloqueo/resultados-bloqueo.component';
import { CertificadosImpresosComponent } from './home/content/certificados-impresos/certificados-impresos.component';
import { RefacturacionesComponent } from './home/content/refacturaciones/refacturaciones.component';
import { LegajosLiberacionComponent } from './home/content/legajos-liberacion/legajos-liberacion.component';
import { TrazabilidadesLegajoComponent } from './home/content/trazabilidades-legajo/trazabilidades-legajo.component';
import { HistoricosLegajosMovimientosComponent } from './home/content/historicos-legajos-movimientos/historicos-legajos-movimientos.component';
import { HistoricosLegajosAnomaliasComponent } from './home/content/historicos-legajos-anomalias/historicos-legajos-anomalias.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'page_not_found', component: PageNotFoundComponent },
    { path: 'profile', component: ChangePasswordComponent},
    { path: 'datos_comunes/estado_legajo', component:  EstadoLegajosComponent},
    { path: 'datos_comunes/tipo_documento', component: TipoDocumentoComponent},
    { path: 'datos_comunes/documentos_tipo_venta', component: DocumentoTipoVentaComponent},
    { path: 'datos_comunes/movimiento_ente', component: MovimientosEnteComponent},
    { path: 'datos_comunes/tipo_venta', component: TipoDeVentaComponent},
    { path: 'datos_comunes/concesionario_ente', component: ConcesionariosEnteComponent},
    { path: 'datos_comunes/gestores', component: GestoresComponent},
    { path: 'datos_comunes/modos_entrega', component: ModoEntregasComponent},
    { path: 'datos_comunes/boca_entrega_ente', component: BocaEntregasComponent},
    { path: 'datos_comunes/anomalias', component: AnomaliasComponent},
    { path: 'datos_comunes/resultados_bloqueo', component: ResultadosBloqueoComponent},
    { path: 'consultas/certificados_impresos', component: CertificadosImpresosComponent},
    { path: 'consultas/historico_legajos', component: HistoricosLegajosMovimientosComponent},
    { path: 'consultas/historico_legajos_anomalia', component: HistoricosLegajosAnomaliasComponent},
    { path: 'consultas/refacturacion', component: RefacturacionesComponent},
    { path: 'consultas/legajos_liberacion', component: LegajosLiberacionComponent},
    { path: 'consultas/trazabilidad_legajos', component: TrazabilidadesLegajoComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
