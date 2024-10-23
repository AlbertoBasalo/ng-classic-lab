import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

/**
 * Home Page, displays the home page
 * @requires HomeService to load the next launches
 * @requires LogService to log changes
 * @requires LOG_SOURCE to identify the source of the log
 */
@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LOG_SOURCE, useValue: '🏠 Home Page' }, LogService],
})
export class HomePage {
  nextLaunches$: Observable<LaunchDto[] | undefined>;
  // isWorking$ = new BehaviorSubject<boolean>(false);
  //error$ = new BehaviorSubject<string | null>(null);

  constructor(private readonly homeService: HomeService, private readonly logService: LogService) {
    //this.logService.log('Initialized');
    //this.isWorking$.next(true);
    this.nextLaunches$ = this.homeService.loadNextLaunches$();
    /* .pipe(
      tap({
        next: () => this.isWorking$.next(false),
        error: (error) => {
          this.isWorking$.next(false);
          this.error$.next(error.statusText || error.message || 'Unknown error');
        },
      }), */
  }
}
