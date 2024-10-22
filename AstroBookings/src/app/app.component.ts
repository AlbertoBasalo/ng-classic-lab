import { Component } from '@angular/core';
import { LogService } from '@app/services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AstroBookings';
  constructor(private readonly logService: LogService) {
    this.logService.log('AppComponent initialized');
  }
}
