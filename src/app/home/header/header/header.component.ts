import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/login/authenticate.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input()
  public sidenav: any;

  public username!: string;
  public userId!:string;

  constructor(private srvAuth: AuthenticateService, private route: Router) { 
    this.srvAuth.getAuth().subscribe(
      val => {
      }
    );
  }

  ngOnInit(): void {
    const user = StorageService.getDecodedToken();
    this.userId = `${user?.nombre} ${user?.apellido}`;
    this.username = `(${user?.id})`;
  }

  logout() {
    this.srvAuth.logout();
    this.route.navigate(['/']);
  }

}
