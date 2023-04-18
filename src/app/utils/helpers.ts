import isString from 'lodash-es/isString';
import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import forOwn from 'lodash-es/forOwn';
export class Helpers {

  private constructor() {
  }

  public static compareId(first: any, other: any): boolean {
    if (!first && !other) {
      return true;
    }
    return other && first.id === other.id;
  }

  public static compareIdS(first: any, other: any): boolean {
    if (!first && !other) {
      return true;
    }
    return other && first.id === other;
  }

  public static trackById(_index: number, model: any): number {
    return model.id;
  }

  public static displayFullDescription(model: any | string): string | any {
    if (model) {
      return null;
    }
    return isString(model) ? model : model.getFullDescription();
  }

  public static trimObject(obj: any): void {
    if (obj) {
      if (isObject(obj)) {
        this.trimStringsInObject(obj);
      } else if (isArray(obj)) {
        obj.forEach((item, index) => {
          if (isString(item)) {
            obj[index] = obj[index].trim();
          } else if (isObject(item)) {
            this.trimStringsInObject(item);
          }
        });
      }
    }
  }

  private static trimStringsInObject(obj: any): void {
    forOwn(obj, (value, key) => {
      if (isString(value)) {
        obj[key] = value.trim();
      }
    });
  }
}