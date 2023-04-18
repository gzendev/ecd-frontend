import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { AuthenticateService } from 'src/app/services/login/authenticate.service';
import { ChangePasswordService } from 'src/app/services/login/change-password.service';
import { Constants } from 'src/app/utils/constants';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public breadcrumb: MenuItem[];
  form!: FormGroup;
  hide : Boolean;

  protected getFunctionId(): string {
    return "";
    // throw new Error("Method not implemented.");
  }

  constructor(
    private router: Router,
    private _chPass: ChangePasswordService,
    private fb: FormBuilder,
    private srvAuth: AuthenticateService
  ) {
    this.hide = true;
    this.breadcrumb = [{label:'Perfil', routerLink:'/profile'}];
    //Constants.PASSWORD_BREADCRUMB
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  public updatePass() {
    console.log('Contraseña vieja: ', this.form.get('oldPassword')?.value);
    console.log('Contraseña nueva: ', this.form.get('newPassword')?.value);

    this._chPass.changePass(this.form.get('oldPassword')?.value, this.form.get('newPassword')?.value).subscribe(resp => {
      this.srvAuth.logout();
      this.router.navigate(['/']);
    })

  }

}
