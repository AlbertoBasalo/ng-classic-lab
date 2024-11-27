import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

/**
 * Base interface for actions
 */
export interface Action {
  type: string;
  payload?: any;
}

/**
 * Generic Store with typed state and actions
 * @template T - Type of the state
 * @template A - Type of the actions (must extend Action)
 */
export class Store<T, A extends Action = Action> {
  /**
   * Internal state, accessed only by the store
   */
  private state$: BehaviorSubject<T>;

  /**
   * Effects subscriptions
   */
  private effects: Subscription[] = [];

  /**
   * Reducer function to update the state
   */
  private reducer?: (state: T, action: A) => T;

  /**
   * Creates a new store with the given initial state and optional reducer function
   * - If no reducer is provided, the state will be updated by the action payload directly.
   * @param initialState - Initial state of the store
   * @param reducer - Optional reducer function to update the state
   */
  constructor(initialState: T, reducer?: (state: T, action: A) => T) {
    this.state$ = new BehaviorSubject<T>(this.clone(initialState));
    this.reducer = reducer;
  }

  /**
   * Dispatches an action to update the state.  
   * - The reducer function will be used to update the state if provided.
   * - Otherwise, the state will be updated by the action payload directly.
   * @param action - Action to dispatch
   */
  dispatch(action: A): void {
    const currentState = this.state$.getValue();
    let newState: T;
    if (this.reducer) {
      newState = this.reducer(currentState, action);
    } else {
      newState = action.payload;
    } 
    this.state$.next(this.clone(newState));
  }

  /**
   * Select a portion (or computed projection) of the state as an observable.
   * - The provided function determines the portion (or projection) of the state to observe.
   * - The output observable emits only when the selected portion changes.
   * @param selectorFn - Function to select part or computed projection of the state
   * @returns Observable of the selected state
   */
  select$<R>(selectorFn: (state: T) => R): Observable<R> {
    return this.state$.asObservable().pipe(
      map(selectorFn),
      distinctUntilChanged(), // Emit only if the selected part changes
    );
  }

  /**
   * Add an effect to react to changes in the state.
   * - Effects are functions that run whenever the selected part of the state changes.
   * @param selectorFn - Function to select the part of the state to observe
   * @param effectFn - Function to execute when the selected part changes
   */
  addEffect<R>(selectorFn: (state: T) => R, effectFn: (value: R) => void): void {
    const trigger$ = this.select$(selectorFn);
    const effectSubscription = trigger$.pipe(tap(effectFn)).subscribe();
    this.effects.push(effectSubscription);
  }

  /**
   * Get the current state value (synchronously).
   * - ensures immutability by cloning the state
   * @returns The current state
   */
  getState(): T {
    return this.clone(this.state$.getValue());
  }

  /**
   * Clone the state to ensure immutability.
   * - Use structured cloning for deep copies.
   * @param state - The state to clone
   * @returns A new copy of the state
   */
  private clone(state: T): T {
    return JSON.parse(JSON.stringify(state));
  }

  /**
   * Clean up all effects and subscriptions.
   * - must be called when the store is destroyed
   */
  destroy(): void {
    this.effects.forEach((effect) => effect.unsubscribe());
    this.effects = [];
  }
}
