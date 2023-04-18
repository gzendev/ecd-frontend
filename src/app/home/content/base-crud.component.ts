import {Router} from '@angular/router';
import {EMPTY, Observable, forkJoin, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {MenuItem} from 'primeng/api';
import { TableTemplate } from 'src/app/model/table-template.model';
import { RestService } from 'src/app/services/rest.service';
import { TableService } from 'src/app/services/table.service';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { TableColumn } from 'src/app/model/table-column.model';
import { Metadata, MetadataItem } from 'src/app/gefco/gefco-filters/gefco-filters.component';
import { TemplateEvent } from 'src/app/gefco/gefco-template/gefco-template.component';


export abstract class BaseCrudComponent {

  public breadcrumb!: MenuItem[];
  public showV = false;
  public allTemplates: TableTemplate[] = [];
  public currentTemplate!: TableTemplate|any;
  public filtersMetadata: Metadata = {};
  public rows: any[] = [];
  public listPermission = false;
  public readPermission = false;
  public writePermission = false;
  public loading = true;
  public data: any;


  private recoverTemplate !: TableTemplate;

  protected constructor(protected alertService: AlertService, protected restService: RestService, protected router: Router, protected tableService: TableService ) {

  }

  public init(): Observable<void> {
    return this.loadPermissions().pipe(
        mergeMap(() => {
            if(this.listPermission){
              this.saveMenuLog();
                return of(null)
            }
            this.router.navigate(['/home/page_not_found'], {skipLocationChange:true});
            return EMPTY
        }),
        mergeMap(() => {
          return this.loadPaisesFiltersMetadata();
        }),
        mergeMap(() => {
          return this.loadFiltersMetadata();
        }),
        mergeMap(() => {
          return this.loadAll();
        })
    )
  }

  public loadFiltersLocalStorage(currentTemplate: TableTemplate|any): void {
    
    currentTemplate.columns.forEach((column: TableColumn) => {
      
      if (column.name == 'Nro. Legajo') {
        column.filter = {
          operator: 'IGUAL',
          value: this.data.nroLegajo,
          otherValue: null 
        };
      }

      if (column.name == 'País') {
        column.filter = {
          operator: 'IGUAL',
          value: this.data.idPais,
          otherValue: null 
        };
      }
      
      if (column.name == 'Cliente') {
        column.filter = {
          operator: 'IGUAL',
          value: this.data.idCliente,
          otherValue: null 
        };
      }
      
      if (column.name == 'Cuenta') {
        column.filter = {
          operator: 'IGUAL',
          value: this.data.idCuenta,
          otherValue: null 
        };
      }
      
      if (column.name == 'Subcuenta') {
        column.filter = {
          operator: 'IGUAL',
          value: this.data.idSubcuenta,
          otherValue: null 
        };
      }
    })
  }

  public loadRows(): Observable<void> {
    return this.tableService.getRows("api/",this.currentTemplate.crud, this.currentTemplate.columns).pipe(
      mergeMap((rows) => {
        this.rows = rows;
        return of(null as any);
      })
    );
  }

  public loadAll(): Observable<void> {
    return this.tableService.getTemplates(this.getCrudName()).pipe(
      mergeMap((templates) => {
        if (templates.length === 0) {
          return of(null as any);
        }
        this.allTemplates = templates;
        this.currentTemplate = !templates[0].dateOfUse ? this.getDefaultTemplate() : templates[0];
        if(this.data) {
          this.loadFiltersLocalStorage(this.currentTemplate);
        }
        this.recoverTemplate = this.currentTemplate;
        const storedTemplate = StorageService.getTemplate();
        if (storedTemplate && storedTemplate.crud === this.getCrudName()) {
          storedTemplate.pageSize = 15;
          storedTemplate.pageFirst = 0;
          // this.currentTemplate = storedTemplate;
        } else {
          StorageService.setTemplate(this.currentTemplate);
        }
        return this.loadRows();
      })
    );
  }

  private loadPermissions(): Observable<void> {
    return forkJoin(
      this.restService.getC("security/permission", {functionId: this.getFunctionId(), sistemaId: environment.sistemaId}),
      this.restService.getC("security/permission", {functionId: `${this.getFunctionId()}.read`, sistemaId: environment.sistemaId}),
      this.restService.getC("security/permission", {functionId: `${this.getFunctionId()}.write`, sistemaId: environment.sistemaId})
    ).pipe(
      mergeMap((permissions) => {
        this.listPermission = !permissions[0].denied;
        this.readPermission = !permissions[1].denied;
        this.writePermission = !permissions[2].denied;
        return of(null as any);
      })
    );
  }

  public getDefaultTemplate(): TableTemplate | undefined {
    return this.allTemplates.find((template) => {
      return template.defaultTemplate;
    });
  }

  public onExportTable(tableColumns: TableColumn[]): void {
    this.tableService.exportRows(this.currentTemplate.crud, tableColumns).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      console.log(err);
      this.alertService.danger(err);
    });
  }
  
  public onFilterSearch(tableColumns: TableColumn[]): void {
    this.currentTemplate.columns = tableColumns;
    this.tableService.getRows("framework/api/",this.currentTemplate.crud, this.currentTemplate.columns).subscribe((rows) => {
      this.rows = rows;
      this.currentTemplate.pageFirst = 0;
      StorageService.setTemplate(this.currentTemplate);
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  protected abstract getCrudName(): string;

  protected abstract getFunctionId(): string;

  protected abstract loadFiltersMetadata(): Observable<void>;

  public createMetadataItems(itemsData: any[]): MetadataItem[] {
    return itemsData.map((itemData) => {
      if(itemData.idPais && !itemData.id){
        return {id: itemData.idPais, description: itemData.descripcion};
      }
      if(itemData.idCliente && !itemData.id){
        return {id: itemData.idCliente, description: itemData.descripcion};
      }
      if(itemData.idCuenta){
        return {id: itemData.idCuenta, description: itemData.descripcion}
      }
      if(itemData.idSubcuenta){
        return {id: itemData.idSubcuenta, description: itemData.descripcion}
      }
      if(itemData.id){
        return {id: itemData.id, description: itemData.descripcion}
      }
      return null as any
    });
  }

   public onPaisSelected(item: MetadataItem): void {
    this.filtersMetadata['idCliente'].items = [];
    if (item) {
      this.restService.find('cliente', {idPais: item.id, funcionId:this.getFunctionId()}).subscribe((clientesData) => {
        this.filtersMetadata['idCliente'].items = this.createMetadataItems(clientesData);
        this.filtersMetadata['idCliente'].placeholder = 'Seleccione un cliente';
      }, (err) => {
        this.alertService.danger(err);
      });
       this.restService.find('tipoVenta', {idPais: item.id, activo: true}).subscribe((tiposVentasData) => {
         this.filtersMetadata['tipoVentaLegajo'].items= this.createMetadataItems(tiposVentasData);
         this.filtersMetadata['tipoVentaLegajo'].placeholder= "Seleccione un tipo de venta"
       });
       this.restService.find('origenes', {idPais: item.id, activo:true}).subscribe((origenesData) => {
         this.filtersMetadata['origenDescr'].items= this.createMetadataItems(origenesData);
         this.filtersMetadata['origenDescr'].placeholder = "Seleccione un origen"
       });
       this.restService.find('estadoLegajo', {idPais: item.id, activo:true}).subscribe((estadoLegajoData) => {
        this.filtersMetadata['estadoLegajo'].items= this.createMetadataItems(estadoLegajoData);
        this.filtersMetadata['estadoLegajo'].placeholder = "Seleccione un estado"
      });
    }
  } 

   public onClienteSelected(item: MetadataItem): void {
    this.filtersMetadata['idCuenta'].items = [];
    if (item) {
      this.restService.find('cuenta', {idCliente: item.id, funcionId:this.getFunctionId()}).subscribe((cuentasData) => {
        this.filtersMetadata['idCuenta'].items = this.createMetadataItems(cuentasData);
        this.filtersMetadata['idCuenta'].placeholder = 'Seleccione una cuenta';
      }, (err) => {
        this.alertService.danger(err);
      });
      var idPais = this.filtersMetadata['idPais'].item?.id
       this.restService.find('concesionariosEnte', {idPais: idPais, idCliente: item.id, activo: true}).subscribe((concesionariosData) => {
         this.filtersMetadata['concesionario'].items= this.createMetadataItems(concesionariosData);
         this.filtersMetadata['concesionario'].placeholder= "Seleccione un concesionario"
       });
       this.restService.find('marcas', {idPais: idPais, idCliente: item.id, activo: true}).subscribe((marcasData) => {
         this.filtersMetadata['idMarca'].items= this.createMetadataItems(marcasData);
         this.filtersMetadata['idMarca'].placeholder= "Seleccione una marca"
       });
       
    } 
  } 

   public onCuentaSelected(item: MetadataItem): void {
     this.filtersMetadata['idSubcuenta'].items = [];
     var idCliente = this.filtersMetadata['idCliente'].item?.id
    if (item) {
      this.restService.find('subcuenta', {idCliente: idCliente, idCuenta: item.id , funcionId: this.getFunctionId()}).subscribe((subCuentasData) => {
        this.filtersMetadata['idSubcuenta'].items = this.createMetadataItems(subCuentasData);
        this.filtersMetadata['idSubcuenta'].placeholder = 'Seleccione una Subcuenta';
      }, (err) => {
        this.alertService.danger(err);
      });
    }  
  }  

  private loadPaisesFiltersMetadata():Observable<void>{
    if(!this.filtersMetadata['idPais']){
      return of(null as any);
    }
    return this.restService.find('pais',{funcionId: this.getFunctionId()}).pipe(
      mergeMap((paisesData) => {
        this.filtersMetadata['idPais'].items = this.createMetadataItems(paisesData);
        console.log("filtersMetadata", this.filtersMetadata)
        return of(null as any);
      })
    );
  }

  public useLocationFiltersMetadata(): void {
    this.filtersMetadata['idPais'] = {component: 'select', selectCallback: (item: MetadataItem) => { this.onPaisSelected(item); }, placeholder: 'Seleccione un pais'};
    this.filtersMetadata['idCliente'] = {component: 'select', selectCallback: (item: MetadataItem) => { this.onClienteSelected(item); }, placeholder: 'Seleccione un pais'};
    this.filtersMetadata['idCuenta'] = {component: 'select', selectCallback: (item: MetadataItem) => { this.onCuentaSelected(item); }, placeholder: 'Seleccione un cliente'};
    this.filtersMetadata['idSubcuenta'] = {component: 'select', placeholder: 'Seleccione una cuenta'};
    this.filtersMetadata['concesionario'] = {component: 'select', placeholder: 'Seleccione un cliente'};
    this.filtersMetadata['tipoVentaLegajo'] = {component: 'select', placeholder: 'Seleccione un pais'};
    this.filtersMetadata['origenDescr'] = {component: 'select', placeholder: 'Seleccione un pais'};
    this.filtersMetadata['estadoLegajo'] = {component: 'select', placeholder: 'Seleccione un pais'};
    this.filtersMetadata['idMarca'] = {component: 'select', placeholder: 'Seleccione un cliente'}
  };

  public onTemplateCreate(event: TemplateEvent): void {
    this.tableService.createTemplate(event.template).pipe(
      mergeMap((template:any) => {
        this.currentTemplate = new TableTemplate(template);
        StorageService.setTemplate(this.currentTemplate);
        return this.loadAll();
      })
    ).subscribe(() => {
      if(event.dialogRef){
        event.dialogRef.close();
      }
    }, (err) => {
      this.alertService.danger(err)
    })
  }

  public onTemplateSelect(template: TableTemplate): void {
    this.currentTemplate = template;
    StorageService.setTemplate(this.currentTemplate);
    this.recoverTemplate = new TableTemplate(this.currentTemplate);
    this.loadRows().subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
    if (template.id) {
      this.tableService.updateTemplateDateOfUse(template).subscribe(() => {
        // Nothing to do...
      }, (err) => {
        this.alertService.danger(err);
      });
    } else {
      for (const currentTemplate of this.allTemplates) {
        if (currentTemplate.id) {
          this.tableService.clearTemplateDateOfUse(currentTemplate).subscribe(() => {
            // Nothing to do...
          }, (err) => {
            this.alertService.danger(err);
          });
        }
      }
    }
  }

  public onTemplateUpdate(event: TemplateEvent): void {
    this.currentTemplate.name = event.template.name;
    this.currentTemplate.description = event.template.description;
    this.currentTemplate.publicTemplate = event.template.publicTemplate;
    StorageService.setTemplate(this.currentTemplate);
    this.tableService.updateTemplate(event.template).pipe(
      mergeMap(() => {
        return this.loadAll();
      })
    ).subscribe(() => {
      if (event.dialogRef) {
        event.dialogRef.close();
      }
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onTemplateRestart(): void {
    const index = this.allTemplates.findIndex((template) => {
      return template.id === this.currentTemplate.id;
    });
    this.currentTemplate = new TableTemplate(this.recoverTemplate);
    StorageService.setTemplate(this.currentTemplate);
    this.allTemplates[index] = this.currentTemplate;
    this.loadRows().subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

 public onTemplateDelete(template: TableTemplate): void {
    this.tableService.deleteTemplate(template).pipe(
      mergeMap(() => {
        StorageService.setTemplate(null as any);
        return this.loadAll();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  } 

  private saveMenuLog(): void {
    this.restService.createC('menu', null, { sistemaId: environment.sistemaId, menuId: this.getFunctionId() }).subscribe(() => {
      // Nothing to do...
    });
  }

}
