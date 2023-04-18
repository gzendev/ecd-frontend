import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-delete-row-dialog',
  templateUrl: './delete-row-dialog.component.html',
})
export class DeleteRowDialogComponent implements OnInit {

  private row: any;
  private confirmEmitter!: EventEmitter<any>;

  constructor(private dialogRef: MatDialogRef<DeleteRowDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) { }

  ngOnInit(): void {
    this.row = this.dialogData.row;
    this.confirmEmitter = this.dialogData.confirmEmitter;
  }

  public confirm(): void {
    const observable = new Observable((observer: Observer<any>) => {
      this.confirmEmitter.emit({observer, row: this.row});
    });
    observable.subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      console.log(err);
    });
  }

}
