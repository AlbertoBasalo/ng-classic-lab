import { Injectable } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LogService } from '@app/services/log.service';
import { Observable } from 'rxjs';

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
