import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  url = environment.commonApiUrl;

  constructor(private _http: HttpClient, private _auth: AuthenticateService) {}

  public changePass(oldPassword: string, newPassword: string): Observable<any> {
    let token = this._auth.getToken();
    let userTxt = localStorage.getItem('USER');
    let user;
    if(userTxt !== null){
      user = JSON.parse(userTxt);
    }
    const httpOptions = RestService.getJsonOptions();
    let body = {
      user: '',
      oldPassword: '',
      newPassword: '',
    };
    console.log(user.userName)
    if (token) {
      body.user = userTxt !== null ? user.userName : '';
      body.oldPassword = oldPassword;
      body.newPassword = newPassword;
    }
    console.log(body)
    return this._http.post<any>(
      `${this.url}/usuario/passwordChange`,
      body,
      httpOptions
    );
  }
}  