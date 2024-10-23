import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LaunchDto } from '@app/models/launch.dto';
import { LaunchesRestRepository } from '../../shared/services/launches.rest.repository';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(private launchesRepository: LaunchesRestRepository) {}

  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getLaunchById$(id);
  }
}
