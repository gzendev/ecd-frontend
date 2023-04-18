import { ColumnFilter } from "./column-filter.model";

export class TableColumn {

    public static readonly INTEGER = 'INTEGER';
    public static readonly STRING = 'STRING';
    public static readonly LONG = 'LONG';
    public static readonly DOUBLE = 'DOUBLE';
    public static readonly BIG_DECIMAL = 'BIG_DECIMAL';
    public static readonly DATE = 'DATE';
    public static readonly DATE_TIME = 'DATE_TIME';
    public static readonly BOOLEAN = 'BOOLEAN';
  
    public id!: string;
    public name!: string;
    public attribute!: string;
    public column!: string;
    public type!: string;
    public filterPosition!: number;
    public gridPosition!: number;
    public gridSort!: string;
    public visible!: boolean;
    public filter: ColumnFilter;
    public label!: string;
    public search!: string;
  
    constructor(data?: any) {
      
      this.id = data.id;
      this.name = data.name;
      this.attribute = data.attribute;
      this.label = data.label ? data.label : data.name;
      this.column = data.column;
      this.type = data.type;
      this.filterPosition = data.filterPosition;
      this.gridPosition = data.gridPosition;
      this.gridSort = data.gridSort;
      this.visible = data.visible;
      this.filter = data.filter /* ? data.filter : null */;
     /*  this.filter = data.filter ? (data.filter as any[]).map((filters) => {
        return new ColumnFilter(filters);
      }) : []; 
      console.log("data",data);
      console.log("filtro",data.filter);*/
      
    }
    public get(name:string): any {
      return `${this.name} (${this.id})`;
    }
  }