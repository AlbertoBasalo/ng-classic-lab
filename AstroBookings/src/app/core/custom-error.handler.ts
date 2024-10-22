import { ErrorHandler } from '@angular/core';
import { LogService } from '@app/services/log.service';

/**
 * Custom Error Handler, logs the error using the LogService
 * @implements ErrorHandler
 * @requires LogService
 */
export class CustomErrorHandler implements ErrorHandler {
  constructor(private logService: LogService) {}

  handleError(error: any): void {
    this.logService.log(`👽 ${error.message}`);
    this.logService.error(error);
  }
}
