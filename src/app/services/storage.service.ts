import { Injectable } from '@angular/core';
import { TableTemplate } from '../model/table-template.model';
import { TokenUser } from '../model/token-user.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private static readonly USER = 'USER';
  private static readonly TEMPLATE = 'TEMPLATE';
  private static readonly USER_TOKEN = 'USER_TOKEN';

  constructor() { }

  
  public static getUser(): Usuario|null {
    const userJson = localStorage.getItem('USER');
    return userJson ? new Usuario(JSON.parse(userJson)) : null;
  }
  public static setUser(usuario:Usuario){
    localStorage.setItem("USER", JSON.stringify(usuario))
  }
  
  public static setDecodedToken(user: TokenUser): void {
    localStorage.setItem("USER_TOKEN", JSON.stringify(user));
  }

  public static getDecodedToken(): TokenUser {
    return new TokenUser(JSON.parse(localStorage.getItem('USER_TOKEN') as string));
  } 
  
  public static setTemplate(template: TableTemplate): void {
    localStorage.setItem(StorageService.TEMPLATE, JSON.stringify(template));
  }

  public static getTemplate(): TableTemplate | null {
    const templateJson = localStorage.getItem(StorageService.TEMPLATE);
    return templateJson ? new TableTemplate(JSON.parse(templateJson)) : null;
  }
  
}
