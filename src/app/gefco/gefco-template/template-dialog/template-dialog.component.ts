import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableTemplate } from 'src/app/model/table-template.model';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.scss']
})
export class TemplateDialogComponent implements OnInit {
  
  public template!: TableTemplate;

  constructor(private dialogRef: MatDialogRef<TemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) { }

  ngOnInit(): void {
    this.template = new TableTemplate(this.dialogData);
  }

  public save():void{
    this.template.name = this.template.name.trim();
    this.template.description != this.template.description ? this.template.description.trim(): null;
    this.template.publicTemplate = this.template.publicTemplate ? true : false;
    this.dialogRef.close(this.template);
  }
}
