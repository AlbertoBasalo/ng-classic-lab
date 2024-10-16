import { HttpClient } from '@angular/common/http';
import { LaunchesRestRepository } from '@app/services/launches.rest.repository';
import { environment } from '../../environments/environment';
import { LaunchesMemRepository } from '../shared/services/launches.mem.repository';
import { LaunchesRepository } from '../shared/services/launches.repository';

// ng g environments

/**
 * Launches Repository Factory, creates the correct implementation of the LaunchesRepository
 * @param http - HttpClient
 * @returns - LaunchesRepository, either LaunchesRestRepository or LaunchesMemRepository
 */
export function launchesRepositoryFactory(http: HttpClient): LaunchesRepository {
  if (environment.useRestApi) {
    return new LaunchesRestRepository(http);
  } else {
    return new LaunchesMemRepository();
  }
}
