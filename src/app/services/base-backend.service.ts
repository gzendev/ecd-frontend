import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseBackendService {

  url = environment.commonApiUrl;

  constructor(
    public http: HttpClient
  ) { 
  }

  GET<T>(api:string): Observable<T> {
    return this.http.get<T>(this.url+api);
  }
}
