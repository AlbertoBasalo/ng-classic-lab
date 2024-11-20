import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ApiAction, appReducer, AppState, UserAction } from './global.state';

/**
 * Global store service
 * - manages the state of the application
 * - provides a way to dispatch actions and select portions of the state
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalStore {
  // Internal state, accessed only by the store
  readonly #state$ = new BehaviorSubject<AppState>({});

  /**
   * Observable of the state
   */
  readonly state$: Observable<AppState> = this.#state$.asObservable();

  /**
   * Dispatch an action to update the state
   * @param action Action to dispatch
   */
  dispatch(action: UserAction | ApiAction): void {
    const currentState = this.#state$.getValue();
    const newState = appReducer(currentState, action);
    this.#state$.next(newState);
  }

  /**
   * Selector to get a portion (or projection) of the state
   * @param selector Selector function. Takes the state and returns a computed projection of it.
   * @returns Observable of the selected portion of the state
   **/
  select<K>(selector: (state: AppState) => K): Observable<K> {
    return this.#state$.pipe(map(selector), distinctUntilChanged());
  }
}
