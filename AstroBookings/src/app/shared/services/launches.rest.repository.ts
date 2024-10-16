import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { Observable } from 'rxjs';
import { LaunchDto, LaunchStatus } from '../models/launch.dto';
import { LaunchesRepository } from './launches.repository';

@Injectable()
export class LaunchesRestRepository extends LaunchesRepository {
  private readonly baseUrl = `${environment.apiUrl}/launches`;

  constructor(private http: HttpClient) {
    super();
  }

  getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]> {
    return this.http.get<LaunchDto[]>(`${this.baseUrl}?status=${status}`);
  }
}
