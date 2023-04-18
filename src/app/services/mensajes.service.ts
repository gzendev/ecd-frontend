import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../model/mensaje.model';
import { BaseBackendService } from './base-backend.service';

@Injectable({
  providedIn: 'root'
})
export class MensajesService extends BaseBackendService {

  constructor(
    private _http:HttpClient
  ) {
    super(_http);
  }

  getMensaje(idioma:number, id:number): Observable<Mensaje> {
    return this.GET<Mensaje>("/mensajes/"+idioma.toString()+"/"+id.toString());
  }
}
