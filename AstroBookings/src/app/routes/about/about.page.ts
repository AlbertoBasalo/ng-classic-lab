import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogService } from '@app/services/log.service';
import { AboutService } from './about.service';

/**
 * About Page, displays the about page
 * @requires AboutService to get the about info
 * @requires LogService to log changes (but without providing a LOG_SOURCE)
 */
@Component({
  templateUrl: './about.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LogService],
})
export class AboutPage {
  aboutInfo: string;

  constructor(
    private readonly aboutService: AboutService,
    private readonly logService: LogService,
  ) {
    this.logService.log('AboutPage Initialized');
    this.aboutInfo = this.aboutService.getAboutInfo();
  }
}
