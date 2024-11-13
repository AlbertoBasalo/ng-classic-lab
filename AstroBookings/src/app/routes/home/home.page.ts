import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaunchDto } from '@app/models/launch.dto';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { map, Observable, switchMap, tap } from 'rxjs';
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
  /**
   * Observable to get the next launches
   */
  nextLaunches$: Observable<LaunchDto[] | undefined>;

  /**
   * The current search term
   */
  searchTerm: string = '';

  constructor(
    private readonly homeService: HomeService,
    private readonly logService: LogService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.logService.log('Initialized');
    // set the next launches observable to the home service
    // first get the search term from the url query params
    this.nextLaunches$ = this.route.queryParams.pipe(
      map((params) => params['q'] || ''),
      tap((searchTerm) => (this.searchTerm = searchTerm)),
      // switchMap to cancel previous requests when a new search term is emitted
      switchMap((searchTerm) => this.homeService.loadNextLaunches$(searchTerm)),
    );
  }

  /**
   * Handles the search event
   */
  onSearch(searchTerm: string) {
    // check for valid search term
    if (typeof searchTerm !== 'string') return;
    this.logService.log(`on Search: ${searchTerm}`);
    // write the search term to url query params
    this.router.navigate([], { queryParams: { q: searchTerm } });
  }
}
