import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { Observable } from 'rxjs';
import { LaunchDto, LaunchStatus } from '../models/launch.dto';
import { LaunchesRepository } from './launches.repository';

/**
 * Launches Rest Repository, provides methods to get launches from the REST API
 * @requires HttpClient
 */
@Injectable({ providedIn: 'root' })
export class LaunchesRestRepository extends LaunchesRepository {
  private readonly baseUrl = `${environment.apiUrl}/launches`;

  constructor(private http: HttpClient) {
    console.log('LaunchesRestRepository initialized');
    super();
  }

  /**
   * Gets launches by status
   * @param status - The status of the launches to get
   * @returns - An observable that emits the launches
   */
  getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]> {
    const forcedDelay = '&delay=1000'; // '&delay=1000';
    const forcedStatus = ''; //'&status=418';
    const forcedEmpty = ''; // 'kk';
    const url = `${this.baseUrl}?q=${status}${forcedEmpty}${forcedDelay}${forcedStatus}`;
    console.log('getLaunchesByStatus$ with ', url);
    return this.http.get<LaunchDto[]>(url);
  }

  getLaunchById$(id: string): Observable<LaunchDto> {
    const forcedDelay = '&delay=2000'; // '&delay=1000';
    const forcedStatus = ''; //'&status=418';
    const forcedEmpty = ''; // 'kk';
    const url = `${this.baseUrl}/${id}?${forcedEmpty}${forcedDelay}${forcedStatus}`;
    console.log('getLaunchById$ with ', url);
    return this.http.get<LaunchDto>(url);
  }
}
