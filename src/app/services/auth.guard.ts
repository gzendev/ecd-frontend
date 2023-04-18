import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { StorageService } from './storage.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (StorageService.getUser()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}