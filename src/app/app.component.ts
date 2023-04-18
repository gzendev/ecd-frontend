import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecd-frontend';

  constructor(public loadingBarService: LoadingBarService){

  }
  ngOnInit(): void {
    
  }
}
