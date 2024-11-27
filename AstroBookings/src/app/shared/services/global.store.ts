import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
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

  // Internal effects subscriptions
  private effects: Subscription[] = [];

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
  select$<K>(selector: (state: GlobalState) => K): Observable<K> {
    return this.#state$.pipe(map(selector), distinctUntilChanged());
  }

  /**
   * Add an effect to the store, that runs when the selected part of the state changes  
   * @param selectorFn - Function to select the part of the state to observe  
   * @param effectFn - Function to execute when the selected part changes
   */
  addEffect<K>(selectorFn: (state: GlobalState) => K, effectFn: (value: K) => void): void {
    const trigger$ = this.select$(selectorFn);
    const effectSubscription = trigger$.pipe(tap(effectFn)).subscribe();
    this.effects.push(effectSubscription);
  }
}
