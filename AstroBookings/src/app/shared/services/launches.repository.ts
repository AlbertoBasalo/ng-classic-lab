import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaunchDto, LaunchStatus } from '../models/launch.dto';

// npm run ng -- g s shared/services/launches-repository

@Injectable()
export abstract class LaunchesRepository {
  abstract getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]>;
}
