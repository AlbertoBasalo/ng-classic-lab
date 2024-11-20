import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Generic Store
 * @template T - Type of the state
 */
export class Store<T> {
  private state$: BehaviorSubject<T>;

  /**
   * Creates a new store with the given initial state.
   * @param initialState - Initial state of the store
   */
  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(this.clone(initialState));
  }

  /**
   * Dispatch a change to the state.
   * The provided function will receive the current state
   * and must return a new state.
   * - we take care of immutability by cloning the state before updating it
   * @param updateFn - Function to update the state
   */
  dispatch(updateFn: (state: T) => T): void {
    const currentState = this.state$.getValue();
    const newState = this.clone(updateFn(currentState));
    this.state$.next(newState);
  }

  /**
   * Select a portion (or computed projection) of the state as an observable.
   * The provided function determines the portion (or projection) of the state to observe.
   * The output observable emits only when the selected portion changes.
   *
   * @param selectorFn - Function to select part or computed projection of the state
   * @returns Observable of the selected state
   */
  select<R>(selectorFn: (state: T) => R): Observable<R> {
    return this.state$.asObservable().pipe(
      map(selectorFn),
      distinctUntilChanged(), // Emit only if the selected part changes
    );
  }

  /**
   * Get the current state value (synchronously).
   * - ensures immutability by cloning the state
   *
   * @returns The current state
   */
  getState(): T {
    return this.clone(this.state$.getValue());
  }

  /**
   * Clone the state to ensure immutability.
   * Use structured cloning for deep copies.
   *
   * @param state - The state to clone
   * @returns A new copy of the state
   */
  private clone(state: T): T {
    return JSON.parse(JSON.stringify(state));
  }
}
