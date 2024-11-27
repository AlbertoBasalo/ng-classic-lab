import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { GlobalAction, globalReducer, GlobalState, initialGlobalState } from './global.state';


/**
 * Global store service
 * - manages the state of the application
 * - provides a way to dispatch actions and select portions of the state
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalStore {
  // Internal state, mutated only by the store dispatcher
  readonly #state$ = new BehaviorSubject<GlobalState>(initialGlobalState);

  /**
   * Observable of the state changes
   */
  readonly state$: Observable<GlobalState> = this.#state$.asObservable();

  /**
   * Dispatch an action to update the state
   * @param action Action to dispatch
   */
  dispatch(action: GlobalAction): void {
    const currentState = this.#state$.getValue();
    const newState = globalReducer(currentState, action);
    this.#state$.next(newState);
  }

  /**
   * Selector to get a portion (or projection) of the state
   * @param selector Selector function. Takes the state and returns a computed projection of it.
   * @returns Observable of the selected portion of the state
   **/
  select<K>(selector: (state: GlobalState) => K): Observable<K> {
    return this.#state$.pipe(map(selector), distinctUntilChanged());
  }
}
