import {Component, Input, OnInit} from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Menu } from 'src/app/model/menu.model';
import { EventService } from 'src/app/services/event.service';
import { RestService } from 'src/app/services/rest.service';

export interface Event {
  name: string;
  value: any;
}

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent{


  public view !: false;
  @Input()
  public menus!: Menu[];
  @Input()
  public level: number;
  constructor(
    private eventService : EventService) {
    this.level = 1;
  }
  
  public toggle(menu: any): void {
    menu.expand =! menu.expand;
  }

   public onToggleSideNav(): void {
    const clickToogle = 'clickToogle';
    this.eventService.publish(clickToogle, null);
  }   
  
}
