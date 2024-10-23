import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { LaunchDto, LaunchStatus } from '../models/launch.dto';
import { LaunchesRepository } from './launches.repository';

/**
 * Launches Memory Repository, provides methods to get launches from memory
 * - Used for testing purposes
 */
@Injectable()
export class LaunchesMemRepository extends LaunchesRepository {
  private readonly launches: LaunchDto[] = [
    {
      id: '1',
      agencyId: '1',
      rocketId: '1',
      date: new Date(2029, 5, 1),
      mission: 'Moon Landing',
      destination: 'Moon',
      pricePerSeat: 100,
      status: 'scheduled',
    },
    {
      id: '2',
      agencyId: '2',
      rocketId: '2',
      date: new Date(2033, 8, 2),
      mission: 'Mars Flight',
      destination: 'Mars',
      pricePerSeat: 200,
      status: 'scheduled',
    },
    {
      id: '3',
      agencyId: '3',
      rocketId: '3',
      date: new Date(2037, 11, 3),
      mission: 'Jupiter Mission',
      destination: 'Jupiter',
      pricePerSeat: 300,
      status: 'aborted',
    },
  ];

  getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]> {
    return of(this.launches.filter((launch) => launch.status === status)).pipe(delay(2000));
  }

  getLaunchById$(id: string): Observable<LaunchDto> {
    const foundLaunch = this.launches.find((launch) => launch.id === id);
    if (foundLaunch) {
      return of(foundLaunch);
    }
    return throwError(() => new Error('Launch not found'));
  }
}
