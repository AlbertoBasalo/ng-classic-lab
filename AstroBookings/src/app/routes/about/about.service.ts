import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor() {}

  getAboutInfo(): string {
    throw new Error('This is a test error');
    // return 'This is information about our company.';
  }
}
