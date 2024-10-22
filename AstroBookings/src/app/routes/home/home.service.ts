import { Injectable } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LogService } from '@app/services/log.service';
import { Observable } from 'rxjs';

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

  loadNextLaunches$(): Observable<LaunchDto[]> {
    return this.launchesRepository.getLaunchesByStatus$('scheduled');
  }
}
