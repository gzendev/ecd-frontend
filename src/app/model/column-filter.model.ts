export class ColumnFilter {

    public static readonly TODOS = 'TODOS';
    public static readonly IGUAL = 'IGUAL';
    public static readonly DISTINTO = 'DISTINTO';
    public static readonly MAYOR = 'MAYOR';
    public static readonly MAYOR_IGUAL = 'MAYOR_IGUAL';
    public static readonly MENOR = 'MENOR';
    public static readonly MENOR_IGUAL = 'MENOR_IGUAL';
    public static readonly CONTIENE = 'CONTIENE';
    public static readonly NO_CONTIENE = 'NO_CONTIENE';
    public static readonly EN = 'EN';
    public static readonly ENTRE = 'ENTRE';
    public static readonly VACIO = 'VACIO';
    public static readonly VACIO_O = 'VACIO_O';
    public static readonly NO_VACIO = 'NO_VACIO';
    public static readonly COMIENZA = 'COMIENZA';
    public static readonly TERMINA = 'TERMINA';
  
    public operator!: string;
    public value!: any;
    public otherValue!: any;
  
    constructor(data?: any) {
      this.operator = data.operator;
      this.value = data.value;
      this.otherValue = data.otherValue;
    }
  }
  
