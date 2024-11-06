import { Injectable } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LogService } from '@app/services/log.service';
import { map, Observable } from 'rxjs';

/**
 * Home Service, loads the next launches
 * @requires LaunchesRepository to load the launches
 * @requires LogService to log changes
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private readonly launchesRepository: LaunchesRepository,
    private readonly logService: LogService,
  ) {
    this.logService.log('Initialized');
  }

  loadNextLaunches$(searchTerm?: string): Observable<LaunchDto[]> {
    console.log('Search Term', searchTerm);
    return this.launchesRepository.getLaunchesByStatus$('scheduled').pipe(
      // filter the launches by the search term. If the search term is not provided, return all launches
      map((launches) => {
        if (!searchTerm) return launches;
        return launches.filter((launch) =>
          launch.mission.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }),
    );
  }
}
