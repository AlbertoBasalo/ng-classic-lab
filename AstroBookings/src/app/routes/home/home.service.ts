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

  /**
   * Loads the next launches
   * @param searchTerm - The search term
   * @returns The launches
   */
  loadNextLaunches$(searchTerm?: string): Observable<LaunchDto[]> {
    this.logService.log(`Search Term:  ${searchTerm}`);
    return this.launchesRepository.getLaunchesByStatus$('scheduled').pipe(
      map((launches: LaunchDto[]) => {
        // filter the launches by the search term or all launches if not provided
        if (!searchTerm) return launches;
        return launches.filter((launch) => this.bySearchTerm(launch, searchTerm));
      }),
    );
  }
  private bySearchTerm(launch: LaunchDto, searchTerm: string): boolean {
    const mission = launch.mission.toLowerCase();
    const destination = launch.destination.toLowerCase();
    const termsArray = [mission, destination];
    const searchTermLower = searchTerm.toLowerCase();
    return termsArray.some((term) => term.includes(searchTermLower));
  }
}
