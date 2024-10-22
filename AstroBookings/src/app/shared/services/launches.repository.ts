import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaunchDto, LaunchStatus } from '../models/launch.dto';

// npm run ng -- g s shared/services/launches-repository

/**
 * Launches Repository, provides methods to get launches
 * - Abstract class to provide a common interface for all launches repositories
 */
@Injectable()
export abstract class LaunchesRepository {
  abstract getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]>;
}
