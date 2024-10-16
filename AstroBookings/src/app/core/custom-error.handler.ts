import { ErrorHandler } from '@angular/core';
import { LogService } from '@app/services/log.service';

export class CustomErrorHandler implements ErrorHandler {
  constructor(private logService: LogService) {}
  handleError(error: any): void {
    this.logService.log(`👽 ${error.message}`);
    this.logService.error(error);
  }
}
