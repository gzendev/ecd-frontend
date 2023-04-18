import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import isString from 'lodash-es/isString';
import sortBy from 'lodash-es/sortBy';
import { Observable} from 'rxjs';
import { ColumnFilter } from 'src/app/model/column-filter.model';
import { FilterOperator } from 'src/app/model/filter-operator.model';
import { TableColumn } from 'src/app/model/table-column.model';
import { TableTemplate } from 'src/app/model/table-template.model';

export interface Metadata {
  [key: string]: MetadataValue;
}

export interface MetadataValue {
  component: string;
  placeholder?: string;
  items?: MetadataItem[];
  item?: MetadataItem | null;
  filter?: string | null;
  filterCallback?: (filter: string) => Observable<MetadataItem[]>;
  selectCallback?: (item: MetadataItem) => void;
}

export interface MetadataItem {
  id: any;
  description: string | null;
}

@Component({
  selector: 'app-gefco-filters',
  templateUrl: './gefco-filters.component.html',
})
export class GefcoFiltersComponent implements OnInit {
  @Input()
  public set template(tableTemplate: TableTemplate) {
    if (tableTemplate) {
      this.tableTemplate = new TableTemplate(tableTemplate);
      this.initFilters();
      this.countFilters();
    }
  }

  @Input()
  public metadata!: Metadata;
  @Output()
  public search = new EventEmitter<TableColumn[]>();

  public tableTemplate!: TableTemplate;
  public operators!: FilterOperator[];
  public filtersCount!: number;
  public keepOpened = false;

  @ViewChild('panel')
  private panel!: MatExpansionPanel;

  constructor()
  {
    this.filtersCount = 0;
  }

  ngOnInit(): void {
    this.initOperators();
  }

  private initFilters(): void {
    this.tableTemplate.columns = sortBy(
      this.tableTemplate.columns,
      (tableColumn) => {
        return tableColumn.filterPosition;
      }
    );
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (!tableColumn.column) {
        return;
      }
      if (!tableColumn.filter) {
        this.clearFilter(tableColumn);
        return;
      }
      const metadataValue = this.getMetadataValue(tableColumn);
      if (metadataValue && tableColumn.filter.value) {
        if (metadataValue.component === 'autocomplete') {
          metadataValue.item = {
            id: tableColumn.filter.value,
            description: null,
          };
          metadataValue.filter = this.displayMetadataItem(metadataValue.item);
          if (metadataValue.filterCallback) {
            metadataValue
              .filterCallback(metadataValue.filter)
              .subscribe((items) => {
                metadataValue.items = items;
                metadataValue.items.forEach((metadataItem) => {
                  if (metadataValue.item) {
                    if (
                      this.compareMetadataItem(metadataValue.item, metadataItem)
                    ) {
                      metadataValue.item = metadataItem;
                      metadataValue.filter = this.displayMetadataItem(
                        metadataValue.item
                      );
                    }
                  }
                });
              });
          }
        } else if (metadataValue.component === 'select') {
          metadataValue.item = {
            id: tableColumn.filter.value,
            description: null,
          };
          if (metadataValue.selectCallback) {
            metadataValue.selectCallback(metadataValue.item);
          }
        }
      }
    });
  }

  private initOperators(): void {
    this.operators = [];
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.TODOS, name: 'TODOS' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.IGUAL, name: 'IGUAL' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.DISTINTO, name: 'DISTINTO' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.MAYOR, name: 'MAYOR' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.MAYOR_IGUAL, name: 'MAYOR O IGUAL' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.MENOR, name: 'MENOR' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.MENOR_IGUAL, name: 'MENOR O IGUAL' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.CONTIENE, name: 'CONTIENE' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.NO_CONTIENE, name: 'NO CONTIENE' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.EN, name: 'EN' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.ENTRE, name: 'ENTRE' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.VACIO, name: 'VACIO' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.VACIO_O, name: 'VACIO_O' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.NO_VACIO, name: 'NO_VACIO' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.COMIENZA, name: 'COMIENZA' })
    );
    this.operators.push(
      new FilterOperator({ id: ColumnFilter.TERMINA, name: 'TERMINA' })
    );
  }

  private clearFilter(tableColumn: TableColumn): void {
    tableColumn.filter = new ColumnFilter({ operator: ColumnFilter.TODOS });
    const metadataValue = this.getMetadataValue(tableColumn);
    if (metadataValue) {
      metadataValue.item = null;
      metadataValue.filter = null;
      if (metadataValue.component === 'autocomplete') {
        metadataValue.items != null;
      }
    }
  }

  private countFilters(): void {
    this.filtersCount = 0;
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (
        tableColumn.filter &&
        tableColumn.filter.operator !== ColumnFilter.TODOS &&
        tableColumn.filter.value
      ) {
        this.filtersCount += 1;
      }
    });
  }

  public getMetadataValue(tableColumn: TableColumn): MetadataValue {
    if (this.metadata) {
      return this.metadata[tableColumn.attribute];
    }
    return null as any;
  }

  public displayMetadataItem(metadataItem: MetadataItem | string, option?: string): string {
    if (!metadataItem) {
      return null as any;
    }
    if (isString(metadataItem)) {
      return metadataItem;
    }
    if (!metadataItem.description) {
      return String(metadataItem.id);
    }
    if(metadataItem.description && metadataItem.id && option){
      return `${metadataItem.description} - ${metadataItem.id}`;
    }
    return `${metadataItem.description}`;
  }

  public compareMetadataItem(
    first: MetadataItem,
    other: MetadataItem
  ): boolean {
    if (!first && !other) {
      return true;
    }
    return other && first.id === other.id;
  }

  public shouldShowOperator(
    tableColumn: TableColumn,
    operator: FilterOperator | any
  ): boolean {
    if (
      (operator.id === ColumnFilter.CONTIENE ||
        operator.id === ColumnFilter.NO_CONTIENE) &&
      tableColumn.type !== TableColumn.STRING
    ) {
      return false;
    }
    if (
      operator.id !== ColumnFilter.TODOS &&
      operator.id !== ColumnFilter.IGUAL &&
      (tableColumn.type === TableColumn.BOOLEAN ||
        this.getMetadataComponent(tableColumn))
    ) {
      return false;
    }
    return true;
  }

  public getMetadataComponent(tableColumn: TableColumn): string {
    const metadataValue = this.getMetadataValue(tableColumn);
    return metadataValue ? metadataValue.component : (null as any);
  }

  public onMetadataItemSelected(
    tableColumn: TableColumn,
    item: MetadataItem
  ): void {
    const metadataValue = this.getMetadataValue(tableColumn);
    if (metadataValue) {
      tableColumn.filter.value = item.id;
      if (metadataValue.selectCallback) {
        metadataValue.selectCallback(item);
      }
    }
  }

  public filterMetadataItems(tableColumn: TableColumn): void {
    const metadataValue = this.getMetadataValue(tableColumn);
    if (metadataValue && metadataValue.filterCallback) {
      if (metadataValue.filter) {
        metadataValue
          .filterCallback(metadataValue.filter)
          .subscribe((items) => {
            metadataValue.items = items;
          });
      }
    }
  }

  public onSearch(): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      // if (!tableColumn.filter.value) {
      //   this.clearFilter(tableColumn);
      // }
    });
    this.countFilters();
    this.search.emit(this.tableTemplate.columns);
    if (!this.keepOpened) {
      this.panel.close();
    }
  }

  public onClear(): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      this.clearFilter(tableColumn);
    });
    this.countFilters();
    this.search.emit(this.tableTemplate.columns);
    if (!this.keepOpened) {
      this.panel.close();
    }
  }
}
