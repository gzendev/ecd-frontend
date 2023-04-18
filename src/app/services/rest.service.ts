import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Menu } from '../model/menu.model';
import { map, Observable } from 'rxjs';
import { AuthenticateService } from './login/authenticate.service';
import { StorageService } from './storage.service';
import { ResponseData } from '../model/response-data.model';
import { Helpers } from '../utils/helpers';
import { environment } from 'src/environments/environment';


interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  observe?: 'body';
}

interface KeyValue {
  [index: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private static readonly HEADER_USER_NAME = 'UserName';
  private static readonly HEADER_AUTHORIZATION = 'Authorization';
  private static readonly HEADER_SISTEMA_ID = 'SistemaId';

  constructor(private _http: HttpClient) 
  {}

  public get(path:string, params: KeyValue):Observable<any>{
    const httpUrl = this.getEndpoint(`/${path}`); 
    const httpOptions = RestService.getJsonOptions();
    httpOptions.params = this.toHttpParams(params)
    return this._http.get<ResponseData<any>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any>) =>data.response))
  }

  public getC(path:string, params: KeyValue):Observable<any>{
    const httpUrl = this.getEndpointS(`/${path}`); 
    const httpOptions = RestService.getJsonOptions();
    httpOptions.params = this.toHttpParams(params)
    return this._http.get<ResponseData<any>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any>) =>data.response))
  }

   public create(path:string, obj:any, params?:KeyValue):Observable<any>{
    Helpers.trimObject(obj);
    const httpUrl= this.getEndpoint(`/${path}`);
    const httpOptions = RestService.getJsonOptions();
    if(params){
      httpOptions.params = this.toHttpParams(params);
    }
    console.log("2", obj);
    return this._http.post<ResponseData<any>>(httpUrl, obj, httpOptions).pipe(
      map((data:ResponseData<any>) => data.response)
    )
  } 

  public createC(path:string, obj:any, params?:KeyValue):Observable<any>{
   Helpers.trimObject(obj);
   const httpUrl= this.getEndpointS(`/${path}`);
   const httpOptions = RestService.getJsonOptions();
   if(params){
     httpOptions.params = this.toHttpParams(params);
   }
   console.log("2", obj);
   return this._http.post<ResponseData<any>>(httpUrl, obj, httpOptions).pipe(
     map((data:ResponseData<any>) => data.response)
   )
 } 

  public getAll(path:string, params: KeyValue): Observable<any[]>{
    return this.getList(`${path}/all`, params);
  }

  public getAllC(path:string, params: KeyValue): Observable<any[]>{
    return this.getListC(`${path}/all`, params);
  }

  public update(path: string, obj: any, params?:KeyValue): Observable<void> {
    Helpers.trimObject(obj);
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RestService.getJsonOptions();
    if(params){
      httpOptions.params = this.toHttpParams(params);
    }
    return this._http.put<ResponseData<void>>(httpUrl, obj, httpOptions).pipe(
      map((data:ResponseData<any>) => data.response)
    );
  }

  public delete(path: string, params: KeyValue): Observable<void> {
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RestService.getJsonOptions();
    httpOptions.params = this.toHttpParams(params);
    return this._http.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null as any)
    );
  }

  public find(path: string, params: KeyValue): Observable<any[]> {
    return this.getList(`${path}/find`, params);
  }

  public findC(path: string, params: KeyValue): Observable<any[]> {
    return this.getListC(`${path}/find`, params);
  }

  public getEndpoint(path: string): string {
    return RestService.getSysApiUrl(path);
  }

  public getEndpointS(path: string): string {
    return RestService.getCommonApiUrl(path);
  }

  //Servicios generales para utilidades


  
  public static getJsonOptions(customHeaders?: any): HttpOptions {
    return RestService.getOptions({
      ...customHeaders,
      'Content-Type': 'application/json',
    });
  }

  public static getSysApiUrl(url: string): string {
    return environment.webv2ApiUrl + url;
  }

  public static getCommonApiUrl(url: string): string {
    return environment.commonApiUrl + url;
  }

  public static getBlobOptions(customHeaders?: any): HttpOptions {
    return RestService.getOptions({
      ...customHeaders,
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }, {
      observe: 'body',
      responseType: 'blob',
    });
  }

  public static getOptions(customHeaders?: any, others?: any): HttpOptions {
    const headers: any = {...customHeaders};
    const user = StorageService.getUser();
    if (user) {
      if (user.token) {
        headers[RestService.HEADER_AUTHORIZATION] = user.token;
      }
      if (user.userName) {
        headers[RestService.HEADER_USER_NAME] = user.userName;
      }
    }
    headers[RestService.HEADER_SISTEMA_ID] = environment.sistemaId;
    return {headers: new HttpHeaders(headers), ...others};
  }

  private toHttpParams(params: KeyValue): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (!this.isNil(params[key])) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }

  private isNil(value: any){ 
    return value == null

  }

  public getList(path: string, params: KeyValue): Observable<any[]> {
    return this.get(path ,params);
  }

  public getListC(path: string, params: KeyValue): Observable<any[]> {
    return this.getC(path ,params);
  }
}