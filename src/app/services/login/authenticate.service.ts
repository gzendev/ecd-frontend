import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { responseJWT } from 'src/app/model/responseJWT.model';
import { TokenUser } from 'src/app/model/token-user.model';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../model/usuario.model';
import { BaseBackendService } from '../base-backend.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService extends BaseBackendService {
  auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token !: any;

  constructor(
    private _http:HttpClient
    ) 
    {
    super(_http);
  }

  login(username:string, password:string): Observable<Usuario> {
    let body = {
      user: username,
      password: password
    };
    let ret = this.http.post<Usuario>(`${this.url}"/login"`, 
    body).pipe(tap(
      (res: any) => {
        if(res) {
          //guardar token
          const helper = new JwtHelperService();
          const user = new Usuario(res.response)
          const decodedToken = new TokenUser(helper.decodeToken(res.response.token))
          StorageService.setUser(user)
          StorageService.setDecodedToken(decodedToken);
        }
      }
    ));

    this.auth.next(true);

    return ret;
  }

  loginTest(username:string, password:string): Observable<responseJWT> {
    let body = {
      user : username,
      password: password
    };
    let ret = this.http.post<responseJWT>(`${environment.commonApiUrl}/login`, 
    body).pipe(tap(
      (res: responseJWT) => {

        if(res) {
          //guardar token
          const helper = new JwtHelperService();
          const user = new Usuario(res.response)
          const decodedToken = new TokenUser(helper.decodeToken(res.response.token))
          StorageService.setUser(user)
          StorageService.setDecodedToken(decodedToken);
        } 
      }
    ));

    this.auth.next(true);

    return ret;
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER");
  }

  private saveToken(token: string): void {
    localStorage.setItem("USER", token);
    this.token = token;
  }

  getToken(): string | null {
    if(!this.token) {
      this.token = localStorage.getItem("USER");
    }
    return this.token;
  }

  getAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }
}
