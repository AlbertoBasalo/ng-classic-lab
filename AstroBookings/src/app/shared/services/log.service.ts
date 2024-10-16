import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export const LOG_SOURCE = new InjectionToken<string>('logSource');

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(@Optional() @Inject(LOG_SOURCE) private source: string) {
    this.source = source ?? 'Unknown';
  }

  log(message: string): void {
    console.log(`[${this.source}] ${message}`);
  }

  error(message: string): void {
    console.error(`[${this.source}] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${this.source}] ${message}`);
  }
}
