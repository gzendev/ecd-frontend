import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//servicies
import { RestService } from './services/rest.service';
import { MensajesService } from './services/mensajes.service';
import { TableService } from './services/table.service';
import { AlertService } from './services/alert.service';

//Materials angular
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


//primeng
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {PickListModule} from 'primeng/picklist';
import {TreeModule} from 'primeng/tree';
import {MessageService} from 'primeng/api';


//app rutas
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './main/toolbar/toolbar.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { HeaderComponent } from './home/header/header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemsComponent } from './menu/menu-items/menu-items.component';
import { EstadoLegajosComponent } from './home/content/estado-legajos/estado-legajos.component';
import { EstadoLegajoComponent } from './home/content/estado-legajos/estado-legajo/estado-legajo-dialog.component';
import { ContentComponent } from './home/content/content.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { BreadcrumbComponent } from './components/home/general/breadcrumb/breadcrumb.component';
import { GestoresComponent } from './home/content/gestores/gestores.component';
import { GestorComponent } from './home/content/gestores/gestor/gestor.component';

//utils
import { DocumentoTipoVentaComponent } from './home/content/documento-tipo-venta/documento-tipo-venta.component';
import { DocumentosTipoVentaComponent } from './home/content/documento-tipo-venta/documentos-tipo-venta/documentos-tipo-venta.component';
import { ConcesionariosEnteComponent } from './home/content/concesionarios-ente/concesionarios-ente.component';
import { TipoDocumentoComponent } from './home/content/tipo-documento/tipo-documento.component';
import { TipoDocumentosComponent } from './home/content/tipo-documento/tipo-documentos/tipo-documentos.component';
import { TipoDeVentaComponent } from './home/content/tipo-de-venta/tipo-de-venta.component';
import { TiposDeVentaComponent } from './home/content/tipo-de-venta/tipos-de-venta/tipos-de-venta.component';
import { RefacturacionesComponent } from './home/content/refacturaciones/refacturaciones.component';
import { RefacturacionComponent } from './home/content/refacturaciones/refacturacion/refacturacion.component';
import { LegajosLiberacionComponent } from './home/content/legajos-liberacion/legajos-liberacion.component';
import { LegajoLiberacionComponent } from './home/content/legajos-liberacion/legajo-liberacion/legajo-liberacion.component';
import { TrazabilidadesLegajoComponent } from './home/content/trazabilidades-legajo/trazabilidades-legajo.component';
import { TrazabilidadLegajoComponent } from './home/content/trazabilidades-legajo/trazabilidad-legajo/trazabilidad-legajo.component';
import { GefcoTemplateComponent } from './gefco/gefco-template/gefco-template.component';
import { TemplateDialogComponent } from './gefco/gefco-template/template-dialog/template-dialog.component';

import { ModoEntregasComponent } from './home/content/modo-entregas/modo-entregas.component';
import { ModoEntregaComponent } from './home/content/modo-entregas/modo-entrega/modo-entrega.component';
import { BocaEntregasComponent } from './home/content/boca-entregas/boca-entregas.component';
import { BocaEntregaComponent } from './home/content/boca-entregas/boca-entrega/boca-entrega.component';
import { AnomaliasComponent } from './home/content/anomalias/anomalias.component';
import { AnomaliaComponent } from './home/content/anomalias/anomalia/anomalia.component';
import { ResultadosBloqueoComponent } from './home/content/resultados-bloqueo/resultados-bloqueo.component';
import { ResultadoBloqueoComponent } from './home/content/resultados-bloqueo/resultado-bloqueo/resultado-bloqueo.component';
import { ConcesionarioEnteComponent } from './home/content/concesionarios-ente/concesionario-ente/concesionario-ente.component';
import { MovimientosEnteComponent } from './home/content/movimientos-ente/movimientos-ente.component';
import { MovimientoEnteComponent } from './home/content/movimientos-ente/movimiento-ente/movimiento-ente.component';
import { GefcoTableComponent } from './gefco/gefco-table/gefco-table.component';
import { DeleteRowDialogComponent } from './gefco/gefco-table/delete-row-dialog/delete-row-dialog.component';
import {ConfirmDialogComponent} from './home/confirm-dialog/confirm-dialog.component';
//utils
import { AlertModule } from 'ngx-alerts';
import { AuthGuard } from './services/auth.guard';
import { LoadingBarModule } from '@ngx-loading-bar/core';

//fontawesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons/faAddressBook';
import {faChevronCircleDown} from '@fortawesome/free-solid-svg-icons/faChevronCircleDown';
import {faChevronCircleUp} from '@fortawesome/free-solid-svg-icons/faChevronCircleUp';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import { GefcoFiltersComponent } from './gefco/gefco-filters/gefco-filters.component';
import { GefcoMatFilterComponent } from './gefco/gefco-mat-filter/gefco-mat-filter.component';
import { CertificadosImpresosComponent } from './home/content/certificados-impresos/certificados-impresos.component';
import { CertificadoImpresoComponent } from './home/content/certificados-impresos/certificado-impreso/certificado-impreso.component';
import { EventService } from './services/event.service';
import { HistoricoLegajoAnomaliaComponent } from './home/content/historicos-legajos-anomalias/historico-legajo-anomalia/historico-legajo-anomalia.component';
import { HistoricosLegajosAnomaliasComponent } from './home/content/historicos-legajos-anomalias/historicos-legajos-anomalias.component';
import { HistoricoLegajoMovimientoComponent } from './home/content/historicos-legajos-movimientos/historico-legajo-movimiento/historico-legajo-movimiento.component';
import { HistoricosLegajosMovimientosComponent } from './home/content/historicos-legajos-movimientos/historicos-legajos-movimientos.component';


library.add(fas);
library.add(faEye);
library.add(faPen);
library.add(faTrash);
library.add(faAddressBook);
library.add(faEllipsisV);
library.add(faChevronCircleUp);
library.add(faChevronCircleDown);




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    PageNotFoundComponent,
    HeaderComponent,
    MenuComponent,
    MenuItemsComponent,
    EstadoLegajosComponent,
    EstadoLegajoComponent,
    ContentComponent,
    GefcoTableComponent,
    DeleteRowDialogComponent,
  
    ChangePasswordComponent,
    BreadcrumbComponent,
    TipoDocumentoComponent,
    TipoDocumentosComponent,
   
    DocumentoTipoVentaComponent,
    DocumentosTipoVentaComponent,
    ConcesionariosEnteComponent,
    ConcesionarioEnteComponent,
    TipoDeVentaComponent,
    TiposDeVentaComponent,
    GestoresComponent,
    ModoEntregasComponent,
    ModoEntregaComponent,
    BocaEntregasComponent,
    BocaEntregaComponent,
    GestorComponent,
    
    AnomaliasComponent,
    AnomaliaComponent,
    ResultadosBloqueoComponent,
    ResultadoBloqueoComponent,
    MovimientosEnteComponent,
    MovimientoEnteComponent,
    GefcoFiltersComponent,
    GefcoMatFilterComponent,
    CertificadosImpresosComponent,
    CertificadoImpresoComponent,
    RefacturacionesComponent,
    RefacturacionComponent,
    LegajosLiberacionComponent,
    LegajoLiberacionComponent,
    TrazabilidadesLegajoComponent,
    TrazabilidadLegajoComponent,
    ConfirmDialogComponent,
    GefcoTemplateComponent,
    TemplateDialogComponent,
    HistoricoLegajoAnomaliaComponent,
    HistoricosLegajosAnomaliasComponent,
    HistoricoLegajoMovimientoComponent,
    HistoricosLegajosMovimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatProgressBarModule,
    AlertModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right'}),
    TableModule,
    DropdownModule,
    MultiSelectModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    //materialsModules
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,

    LoadingBarModule,

    HttpClientModule,
    FlexLayoutModule,
    BreadcrumbModule,
    AlertModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' }),
  ],
  providers: [
    AuthGuard,
    RestService,
    TableService,
    AlertService,
    MensajesService,
    EventService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
