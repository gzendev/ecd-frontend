import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import format from 'date-fns/format';
import forOwn from 'lodash-es/forOwn';
import { SelectItem, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, Observer } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/home/confirm-dialog/confirm-dialog.component';
import { TableColumn } from 'src/app/model/table-column.model';
import { TableTemplate } from 'src/app/model/table-template.model';
import { StorageService } from 'src/app/services/storage.service';
import { DeleteRowDialogComponent } from './delete-row-dialog/delete-row-dialog.component';

export interface Column {
  field: string;
  header: string;
  type: string;
}

interface ColumnSort {
  field: string;
  order: number;
}

export interface RowActionEvent {
  row: any;
  observer: Observer<any>;
}

@Component({
  selector: 'app-gefco-table',
  templateUrl: './gefco-table.component.html',
  styleUrls: ['../../../assets/_general.scss']
})
export class GefcoTableComponent implements OnInit {
  private static readonly SEARCH_LIMIT = 1000;

  public expanded!:any

  @Input()
  public showU!: boolean;

  @Input()
  public showD!: boolean;

  @Input()
  public showV!: boolean;

  @Input()
  public showC!: boolean;

  @Input()
  public showM!: boolean;

  @Input()
  public menuM!: string;

  @Input()
  public set template(tableTemplate: TableTemplate) {
    if (tableTemplate) {
      this.tableTemplate = tableTemplate;
      this.tableColumnByAttribute = this.getTableColumnByAttribute();
      this.columns = this.getColumns();
      this.visibleColumns = this.getVisibleColumns();
      this.multiSortMeta = this.getMultiSortMeta();
      if (!this.tableTemplate.pageFirst) {
        this.tableTemplate.pageFirst = 0;
      }
      if (!this.tableTemplate.pageSize) {
        this.tableTemplate.pageSize = 15;
      }
    }
  }

  @Input()
  public set rows(rows: any[]) {
    this.formatRows(rows);
    this.tableData = rows;
  }

  @Input()
  public showViewIcon = true;
  @Input()
  public showEditIcon = true;
  @Input()
  public showDeleteIcon = true;
  @Input()
  public menu!: TemplateRef<any>;
  @Input()
  public listPermission!: boolean;
  @Input()
  public writePermission!: boolean;
  @Input()
  public readPermission!: boolean;
  @Input()
  public importer!: boolean;
  /* @Input()
  public importerData!: ImporterDialogData; */
  @Output()
  public viewRow = new EventEmitter<any>();
  @Output()
  public editRow = new EventEmitter<any>();
  @Output()
  public deleteRow = new EventEmitter<RowActionEvent>();
  @Output()
  public selectRow = new EventEmitter<any>();
  @Output()
  public expandRow = new EventEmitter<any>();
  @Output()
  public importFileEvt = new EventEmitter<RowActionEvent>();
  @Output()
  public downloadTemplateEvt = new EventEmitter<RowActionEvent>();
  @Output()
  public exportTable = new EventEmitter<TableColumn[]>();
  @Output()
  public visibleColumn = new EventEmitter<Column[]>();

  public tableData!: any[];
  public tableTemplate!: TableTemplate;
  public tableColumnByAttribute!: Map<string, TableColumn>;
  public columns!: Column[];
  public visibleColumns!: Column[];
  public multiSortMeta!: ColumnSort[];
  public pageSizeOptions!: SelectItem[];
  public limit = GefcoTableComponent.SEARCH_LIMIT;
  
  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.pageSizeOptions = [
      {label: `10`, value: 10},
      {label: `15`, value: 15},
      {label: `20`, value: 20},
      {label: `50`, value: 50},
      {label: `100`, value: 100},
    ];
  }

  public onViewRow(row: any): void {
    this.viewRow.emit(row);
  }

  public onEditRow(row: any): void {
    this.editRow.emit(row);
  }

  public onRowSelect(event: any): void {
    this.selectRow.emit(event.data);
  }

  getColor(row: any) {
    if(row.codEstadoLegajo === 3 && row.legajoCompleto === 'Si') {
      return '#4CAF5052';
    } else if(row.codEstadoLegajo === 1 || row.codEstadoLegajo === 2 && row.legajoCompleto === 'Si') {
      return '#F3DBBF';
    } else if(row.codEstadoLegajo === 0) {
      return '#FFA55B';
    } else if(row.codEstadoLegajo === null){
      return '#EDB9B9';
    }
    return 'none';
  }

  public onDeleteRow(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      row,
      confirmEmitter: this.deleteRow,
    };
    this.dialog.open(DeleteRowDialogComponent, dialogConfig);
  }
 
  public onExportRows(): void {
    const tableColumns: TableColumn[] = [];
      this.tableTemplate.columns.forEach((tableColumn) => {
      tableColumns.push(new TableColumn({...tableColumn}));
      tableColumns[tableColumns.length - 1].name;
    });
    this.exportTable.emit(tableColumns);
  }
  
  public onMenuRow(row: any): void {
    localStorage.setItem('data', JSON.stringify(row));
    this.router.navigate([this.menuM]);
  }

  public onRowExpand(event: any): void {
    const observable = new Observable((observer: Observer<any>) => {
      this.expandRow.emit({observer, row: event.data});
    });
    observable.subscribe((rows) => {
      //this.formatRows(rows);
      event.data.expanded = rows;
    }, (err) => {
      console.log(err);
    });
  }

  public onColumnSort(event: any): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      const sortMeta = (event.multisortmeta as any[]).find((currentSortMeta) => {
        return currentSortMeta.field === tableColumn.attribute;
      });
      if (sortMeta) {
        tableColumn.gridSort = sortMeta.order === 1 ? 'ASC' : 'DESC';
      } else {
        tableColumn.gridSort != null;
      }
    });
    StorageService.setTemplate(this.tableTemplate);
  }
  public showParcialResultDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '40%';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      title: 'grilla.resultado-parcial.titulo',
      content: 'grilla.resultado-parcial.descripcion',
      alert: true,
    };
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  private getTableColumnByAttribute(): Map<string, TableColumn> {
    const tableColumByAttribute: Map<string, TableColumn> = new Map();
    this.tableTemplate.columns.forEach((tableColumn) => {
      tableColumByAttribute.set(tableColumn.attribute, tableColumn);
    });
    return tableColumByAttribute;
  }

  private getColumns(): Column[] {
    const columns: Column[] = [];
    this.tableTemplate.columns.forEach((tableColumn) => {
      columns.push({field: tableColumn.attribute, header: tableColumn.name ,type:tableColumn.type})
    });
    this.visibleColumn.emit(columns);
    return columns;
  }

  private getVisibleColumns(): Column[] {
    const columns: Column[] = [];
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (tableColumn.visible == true) {
        columns.push({field: tableColumn.attribute, header: tableColumn.name, type: tableColumn.type})        
      }
    });
    return columns;
  }

  private getMultiSortMeta(): ColumnSort[] {
    const columns: ColumnSort[] = [];
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (tableColumn.visible && tableColumn.gridSort) {
        if (tableColumn.gridSort === 'ASC') {
          columns.push({field: tableColumn.attribute, order: 1});
        } else if (tableColumn.gridSort === 'DESC') {
          columns.push({field: tableColumn.attribute, order: -1});
        }
      }
    });
    if (columns.length === 0) {
      return null as any;
    }
    return columns;
  }
  private formatRows(rows: any[]): void {{
      if (rows && rows.length > 0) {
        rows.forEach((row) => {
          if (row.activo === undefined) {
            row.activoBoolean = true;
          } else {
            row.activoBoolean = row.activo;
          }
          forOwn(row, (value, key) => {
            const tableColumn = this.tableColumnByAttribute.get(key);
            if (tableColumn) {
              switch (tableColumn.type) {
                case TableColumn.DATE:
                  row[key] = value ? format(new Date(value), "dd/MM/yyyy") : null;
                  row[`${key}InMilis`] = value;
                  break;
                case TableColumn.DATE_TIME:
                  row[key] = value ? format(new Date(value), "dd/MM/yyyy HH:mm:ss") : null;
                  row[`${key}InMilis`] = value;
                  break;
                case TableColumn.BOOLEAN:
                  row[key] = value ? 'Si' : 'No';
                  break;
                default:
                  break;
              }
            }
          });
        });
      }
    };
  } 

  public filterGlobal(table: Table, search2: any): void {
    let search:string = search2.value;
    table.filterGlobal(search, 'contains');
    this.tableTemplate.search = search;
    StorageService.setTemplate(this.tableTemplate);
  }

  public filterColumn(table: Table, search2: any, field: string): void {
    let search:string = search2.value;
    table.filter(search, field, 'contains');
    const tableColumn:any|null = this.tableColumnByAttribute.get(field);
    tableColumn.search = search;
    StorageService.setTemplate(this.tableTemplate);
  }

  public onPageSizeChange(): void {
    this.tableTemplate.pageFirst = 0;
    StorageService.setTemplate(this.tableTemplate);
  }


   public onColumnsVisibilityChange(event: any): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      const column = (event.value as Column[]).find((currentColumn) => {
        return currentColumn.field === tableColumn.attribute;
      });
      tableColumn.visible = column ? true : false;
    });
    StorageService.setTemplate(this.tableTemplate);
    this.visibleColumns = this.getVisibleColumns();
    this.multiSortMeta = this.getMultiSortMeta();
  }

  public onColumnReorder(event: any): void {
    const reorderedColumn = event.columns[event.dropIndex];
    const previousColumn = event.dropIndex > 0 ? event.columns[event.dropIndex - 1] : null;

    const reorderedTableColumnIndex = this.tableTemplate.columns.findIndex((tableColumn) => {
      return tableColumn.attribute === reorderedColumn.field;
    });
    const reorderedTableColumn = this.tableTemplate.columns.splice(reorderedTableColumnIndex, 1)[0];

    const previousTableColumnIndex = previousColumn ? this.tableTemplate.columns.findIndex((tableColumn) => {
      return tableColumn.attribute === previousColumn.field;
    }) : null;
    this.tableTemplate.columns.splice(previousTableColumnIndex ? previousTableColumnIndex + 1 : 0, 0, reorderedTableColumn);

    let position = 1;
    this.tableTemplate.columns.forEach((tableColumn) => {
      tableColumn.gridPosition = position;
      position += 1;
    });
    StorageService.setTemplate(this.tableTemplate);
    this.columns = this.getColumns();
  }

  public onPageChange(e: any): void {
    this.tableTemplate.pageFirst = e.first;
    StorageService.setTemplate(this.tableTemplate);
  }

  public sortColumnData(event: SortEvent|any): void {
    event.data.sort((data1:any, data2:any) => {
      const value1 = data1[event.multiSortMeta[0].field];
      const value2 = data2[event.multiSortMeta[0].field];
      const valueType = this.tableColumnByAttribute.get(event.multiSortMeta[0].field)!.type;
      let result;
      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (valueType === TableColumn.DATE || valueType === TableColumn.DATE_TIME) {
        const value1InMillis = data1[`${event.multiSortMeta[0].field}InMilis`];
        const value2InMillis = data2[`${event.multiSortMeta[0].field}InMilis`];
        result = (value1InMillis < value2InMillis) ? -1 : (value1InMillis > value2InMillis) ? 1 : 0;
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.multiSortMeta[0].order * result);
    });
  }
  
}
