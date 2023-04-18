export class Menu {

    public id!: string;
    public descripcion!: string;
    public icon!: string;
    public url!: string;
    public parentId!: string;
    public children!: Menu[];
    public expand!: boolean;
  
    constructor(data: any) {
      if (data) {
        this.id = data.id;
        this.descripcion = data.descripcion;
        this.icon = data.icon;
        this.url = data.url;
        this.parentId = data.parentId;
        this.children = data.children ? (data.children as any[]).map((child) => {
          return new Menu(child);
        }) : [];
      }
    }
  }
  