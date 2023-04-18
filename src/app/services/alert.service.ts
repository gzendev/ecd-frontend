import {Injectable} from '@angular/core';
import isString from 'lodash-es/isString';

import {AlertService as NgxAlertService} from 'ngx-alerts';

@Injectable()
export class AlertService  {

  constructor(private alertService: NgxAlertService) {
  }

  public success(translation: string): void {
      this.alertService.success(translation);

  }

  public warning(translation: string): void {
      this.alertService.warning(translation);

  }

  public danger(err: any): void {
    let translationKey;
    if (isString(err)) {
      translationKey = err;
    } else if (err.error && err.error.message) {
      translationKey = err.error.message;
    } else if (err.message) {
      translationKey = err.message;
    }
      this.alertService.danger(translationKey);
    
  }
}
