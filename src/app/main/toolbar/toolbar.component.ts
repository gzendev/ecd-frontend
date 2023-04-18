import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticateService } from 'src/app/services/login/authenticate.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() OpenMenu = new EventEmitter();
   
  ambiente = 'local';

  auth:boolean = false;

  constructor(
    private srvAuth:AuthenticateService
  ) { 
    if(environment.title == 'prod'){
      this.ambiente = '';
    }else{
      this.ambiente = ''+environment.title+'';
    }

    this.srvAuth.getAuth().subscribe(
      val => {
        this.auth = val;
      }
    );
  }

  ngOnInit(): void {

  }

  openMenu(){
    this.OpenMenu.emit();
  }

  logout() {
    this.srvAuth.logout();
    this.auth = false;
  }

}
