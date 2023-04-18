import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { mergeMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../model/menu.model';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  public menus!: Menu[];
  public menusRecientes!: Menu[];
  public menusFrecuentes!: Menu[];

  @Output()
  public toogleEvent = new EventEmitter<void>();
  
  constructor(private restService: RestService, private alertService: AlertService) { }
  
  ngOnInit(): void {
      this.restService.getC('menu', {sistemaId: environment.sistemaId}).pipe(
        mergeMap((menuData) => {
          this.menus= [new Menu(menuData)];
            return this.restService.getListC('menu/recent', {sistemaId: environment.sistemaId});
          }),
          mergeMap((menuRecienteData) => {
            this.menusRecientes = [new Menu(menuRecienteData)];
            console.log("menus recientes", this.menusRecientes)
            return this.restService.getListC('menu/frequent', {sistemaId: environment.sistemaId});
          })
      ).subscribe((menuFrecuenteData:any ) => {
        this.menusFrecuentes=[new Menu(menuFrecuenteData)];
        }, (err) => {
          this.alertService.danger(err)
        }
      );
    }
  
  public onToogleSideNav(): void {
    this.toogleEvent.emit();
  } 
}
