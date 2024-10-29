import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LogService } from '@app/services/log.service';

/**
 * Page header component
 */
@Component({
  selector: 'app-page-header',
  template: `
    <header>
      <h1>{{ title }}</h1>
    </header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderBlock {
  /**
   * Page title
   */
  @Input() title = '';
  constructor(private readonly logService: LogService) {
    this.logService.log('PageHeaderBlock initialized');
  }
}
