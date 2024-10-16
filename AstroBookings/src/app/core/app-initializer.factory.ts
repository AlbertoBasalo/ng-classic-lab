import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@app/services/local-storage.service';
import { Subscription } from 'rxjs';

type AppInitializer = () => Subscription;

/**
 * App Initializer Factory, creates a function that will be used to initialize the application
 * @param http - HttpClient
 * @param localStorage - LocalStorageService
 * @returns - Function that initializes the application returning a Subscription
 */
export function appInitializerFactory(
  http: HttpClient,
  localStorage: LocalStorageService,
): AppInitializer {
  let initializerFunction: AppInitializer;
  initializerFunction = () => storeTime(http, localStorage);
  return initializerFunction;
}

function storeTime(http: HttpClient, localStorage: LocalStorageService): Subscription {
  return http
    .get('http://worldtimeapi.org/api/timezone/Europe/Madrid')
    .subscribe((data) => localStorage.write('time', data));
}
