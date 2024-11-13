import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AgencyDto } from '@app/models/agency.dto';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { RocketDto } from '@app/models/rocket.dto';
import { AgenciesRepository } from '@app/services/agencies.repository';
import { BookingsRepository } from '@app/services/bookings.repository';
import { RocketsRepository } from '@app/services/rockets.repository';
import { LaunchesRestRepository } from '../../shared/services/launches.rest.repository';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(
    private launchesRepository: LaunchesRestRepository,
    private agenciesRepository: AgenciesRepository,
    private rocketsRepository: RocketsRepository,
    private bookingsRepository: BookingsRepository,
  ) {}

  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getById$(id);
  }

  getAgencyById$(agencyId: string): Observable<AgencyDto> {
    return this.agenciesRepository.getById$(agencyId);
  }

  getRocketById$(rocketId: string): Observable<RocketDto> {
    return this.rocketsRepository.getById$(rocketId);
  }

  getBookingsByLaunchId$(launchId: string): Observable<BookingDto[]> {
    return this.bookingsRepository.getByLaunchId$(launchId);
  }
}
