import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LaunchesMemRepository } from './launches.mem.repository';
import { LaunchesRepository } from './launches.repository';
import { LaunchesRestRepository } from './launches.rest.repository';

// ng g environments

export function launchesRepositoryFactory(http: HttpClient): LaunchesRepository {
  if (environment.useRestApi) {
    return new LaunchesRestRepository(http);
  } else {
    return new LaunchesMemRepository();
  }
}
