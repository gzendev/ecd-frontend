import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-gefco-mat-filter',
  templateUrl: './gefco-mat-filter.component.html',
  styles: [`
    .gefco-mat-filter {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: white;
    }
  `],
})
export class GefcoMatFilterComponent implements OnInit {

  @Input()
  public set array(array: any[]|undefined) {
    if (array) {
      this.filteredArray = array;
      this.originalArray = [...array];
    }
    console.log('filteredArray: ', this.filteredArray);
    console.log('originalArray', this.originalArray);
  }

  @Input()
  public placeholder!: string;
  @Input()
  public converter!: (value: any, option?:string) => string;

  @ViewChild('filterInput')
  public filterInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatOption)
  public matOption!: MatOption;

  public filteredArray!: any[];
  public originalArray!: any[];

  constructor(@Inject(MatSelect) private matSelect: MatSelect) {

  }

  public ngOnInit(): void {
    this.matOption.disabled = true;
    this.matSelect.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        this.filterInput.nativeElement.focus();
      } else {
        this.reset();
      }
    });
  }

  public filter(search2: any): void {
    let search:string = search2.value;
    const filteredArray = this.originalArray.filter((value) => {
      const finalValue = this.converter ? this.converter(value, 'd') : value;
      return finalValue.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    this.filteredArray.splice(0, this.filteredArray.length);
    Array.prototype.push.apply(this.filteredArray, filteredArray);
  }

  public reset(): void {
    this.filterInput.nativeElement.value = '';
    this.filteredArray.splice(0, this.filteredArray.length);
    Array.prototype.push.apply(this.filteredArray, this.originalArray);
  }
}
