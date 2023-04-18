import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit {

  public title!: string;
  public content!: string;
  public alert!: boolean;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    const data = this.dialogData || {};
    this.title = data.title;
    this.content = data.content ;
    this.alert = data.alert;
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
