import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  public items!: MenuItem[];

  public home!: MenuItem;
  public breadcrumb: MenuItem[] = [];

  constructor() {

  }

  public ngOnInit(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/home'}; //environment.urlFrontEnd.concat('home')
    this.items.forEach((item) => {
      item.disabled = !item.url;
      this.breadcrumb.push(item);
    });
  }

}
