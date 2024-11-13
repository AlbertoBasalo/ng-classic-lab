import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AgencyDto } from '@app/models/agency.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { AgenciesRepository } from '@app/services/agencies.repository';
import { LaunchesRestRepository } from '../../shared/services/launches.rest.repository';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(
    private launchesRepository: LaunchesRestRepository,
    private agenciesRepository: AgenciesRepository,
  ) {}

  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getLaunchById$(id);
  }

  getAgencyById$(id: string): Observable<AgencyDto> {
    return this.agenciesRepository.getAgencyById$(id);
  }
}
