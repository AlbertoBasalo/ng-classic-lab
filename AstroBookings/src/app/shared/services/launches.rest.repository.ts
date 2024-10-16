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
@Injectable()
export class LaunchesRestRepository extends LaunchesRepository {
  private readonly baseUrl = `${environment.apiUrl}/launches`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Gets launches by status
   * @param status - The status of the launches to get
   * @returns - An observable that emits the launches
   */
  getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]> {
    return this.http.get<LaunchDto[]>(`${this.baseUrl}?q=${status}`);
  }
}
