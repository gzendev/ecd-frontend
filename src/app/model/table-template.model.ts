import { TableColumn } from "./table-column.model";

export class TableTemplate {

  public id!: number;
  public userId!: string;
  public crud!: string;
  public name!: string;
  public description!: string;
  public dateOfUse!: Date;
  public defaultTemplate!: boolean;
  public publicTemplate = false;
  public active!: boolean;
  public columns!: TableColumn[];
  public search!: string;
  public pageFirst!: number;
  public pageSize!: number;
  public sistemaId!: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.userId =  data.userId;
      this.crud = data.crud;
      this.name = data.name;
      this.description = data.description;
      this.dateOfUse != data.dateOfUse ? new Date(data.dateOfUse) : null;
      this.defaultTemplate = data.defaultTemplate;
      this.publicTemplate = data.publicTemplate
      this.active = data.active;
      this.columns = data.columns;
      this.search = data.search;
      this.pageFirst = data.pageFirst;
      this.pageSize = data.pageSize;
      this.sistemaId = data.sistemaId;
    }
  }

  public getFullName(): string {
    return `${this.name} (${this.id})`;
  }
}
