import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TableTemplate } from 'src/app/model/table-template.model';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { GefcoFiltersComponent } from '../gefco-filters/gefco-filters.component';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';

export interface TemplateEvent {
  template: TableTemplate;
  dialogRef: MatDialogRef<any, any>|null;
}


@Component({
  selector: 'app-gefco-template',
  templateUrl: './gefco-template.component.html',
  styleUrls: ['./gefco-template.component.scss']
})
export class GefcoTemplateComponent {

  @Input()
  public templates!: TableTemplate[]|any;
  @Input()
  public template!: TableTemplate;
  @Output()
  public create = new EventEmitter<TemplateEvent>();
  @Output()
  public update = new EventEmitter<TemplateEvent>();
  @Output()
  public delete = new EventEmitter<TableTemplate>();
  @Output()
  public select = new EventEmitter<TableTemplate>();
  @Output()
  public restart = new EventEmitter<void>();
  
  public userLogued!: string;
  
  
  constructor(
    private dialog: MatDialog) 
    { 
      const user = StorageService.getDecodedToken();
      this.userLogued = `${user.id}` ; 
    }
    
     public openTemplateDialog(newTemplate?: boolean):void {
      const template = new TableTemplate(this.template);
      if(newTemplate){
        template.id = 0;
        template.description = "";
        template.name = "";
        template.publicTemplate = false;
        template.sistemaId= environment.sistemaId;
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '%60';
      dialogConfig.height = 'auto';
      dialogConfig.data = template;
      const dialogRef = this.dialog.open(TemplateDialogComponent,dialogConfig);
       dialogRef.afterClosed().subscribe((updatedTemplate : TableTemplate) => {
        if(updatedTemplate){
          updatedTemplate.defaultTemplate = false;
          updatedTemplate.active = true;
          if(!updatedTemplate.id){
            this.create.emit({dialogRef, template: updatedTemplate});
          } else {
            this.update.emit({dialogRef, template: updatedTemplate});
          }
        }
      }); 
    } 

    public getDefaultTemplate(): TableTemplate{
        return this.templates.find((template:any) => {
          return !template.id;
        });
    }

    public compareTemplate(first: TableTemplate, other: TableTemplate): boolean {
      return other && first.id === other.id;
    }

    public onTemplateUpdate(): void {
      this.update.emit({template: this.template, dialogRef: null});
    }
  
    public onTemplateDelete(): void {
      this.delete.emit(this.template);
    }
  
    public onTemplateSelect(): void {
      this.select.emit(this.template);
    }
  
    public onTemplateRestart(): void {
      this.restart.emit();
    }
 
}
