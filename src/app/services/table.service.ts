import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { TableColumn } from '../model/table-column.model';
import { RestService } from './rest.service';
import { ResponseData } from '../model/response-data.model';
import { TableTemplate } from '../model/table-template.model';
import { Helpers } from '../utils/helpers';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';
interface KeyValue {
  [index: string]: any;
}

@Injectable()
export class TableService {

  constructor(private httpClient: HttpClient) {

  }

  public getNumberRows(crud: string, columns: TableColumn[]): Observable<number> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getNumberRows`);
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.post<ResponseData<number>>(httpUrl, columns, httpOptions).pipe(
      map((data: ResponseData<number>) => data.response)
    );
  }

  public getRows(path:string, crud: string, columns: TableColumn[]): Observable<any[]> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getRows`);
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.post<ResponseData<any[]>>(httpUrl, columns, httpOptions).pipe(
      map((data: ResponseData<any[]>) => data.response)
    );
  }

  public getAuditRows(crud: string, params: KeyValue): Observable<any[]> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getAuditRows`);
    const httpOptions = RestService.getJsonOptions();
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });
    httpOptions.params = httpParams;
    return this.httpClient.get<ResponseData<any[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any[]>) => data.response)
    );
  }

  public getExpandedRows(crud: string, params: KeyValue): Observable<any[]> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getExpandedRows`);
    const httpOptions = RestService.getJsonOptions();
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });
    httpOptions.params = httpParams;
    return this.httpClient.get<ResponseData<any[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any[]>) => data.response)
    );
  }

  
  public exportRows(crud: string, columns: TableColumn[]): Observable<Blob> {
    const httpUrl = this.getEndpoint(`/${crud}/table/export`);
    const httpOptions = RestService.getBlobOptions();
    this.httpClient.post<Blob>(httpUrl, columns, httpOptions).subscribe((data) => {
      const fileName =  `${crud}.xlsx`;
      FileSaver.saveAs(data, fileName);
    }, (err) => {
      console.log(err);
    });
    return of(null as any);
  }
  
  public getTemplates(crud: string): Observable<TableTemplate[]> {
    const httpUrl = this.getEndpointS(`/template/${crud}/getAll?sistemaId=${environment.sistemaId}`);
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.get<ResponseData<TableTemplate[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<TableTemplate[]>) => {
        const templates: TableTemplate[] = [];
        data.response.forEach((template) => {
          templates.push(new TableTemplate(template));
        });
        return templates;
      })
    );
  }
  
 public createTemplate(template: TableTemplate): Observable<TableTemplate> {
    Helpers.trimObject(template);
    const httpUrl = this.getEndpointS('/template');
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.post<ResponseData<TableTemplate>>(httpUrl, template, httpOptions).pipe(
      map((data: ResponseData<TableTemplate>) => new TableTemplate(data.response))
    );
  }

  public updateTemplate(template: TableTemplate): Observable<void> {
    Helpers.trimObject(template);
    const httpUrl = this.getEndpointS('/template');
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.put<void>(httpUrl, template, httpOptions).pipe(
      map(() => null as any)
    );
  }

  public updateTemplateDateOfUse(template: TableTemplate): Observable<void> {
    const httpUrl =this.getEndpointS(`/template/${template.id}/dateOfUse`);
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.put<void>(httpUrl, null, httpOptions).pipe(
      map(() => null as any)
    );
  }

  public clearTemplateDateOfUse(template: TableTemplate): Observable<void> {
    const httpUrl = this.getEndpointS(`/template/${template.id}/dateOfUse`);
    const httpOptions = RestService.getJsonOptions();
    return this.httpClient.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null as any)
    );
  }

  public deleteTemplate(template: TableTemplate): Observable<void> {
    const httpUrl = this.getEndpointS('/template');
    const httpOptions = RestService.getJsonOptions();
    let httpParams = new HttpParams();
    httpParams = httpParams.set('id', String(template.id));
    httpOptions.params = httpParams;
    return this.httpClient.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null as any)
    );
  } 

  public getEndpoint(path: string): string {
    return RestService.getSysApiUrl(path);
  } 

  public getEndpointS(path: string): string {
    return RestService.getCommonApiUrl(path);
  }

}
