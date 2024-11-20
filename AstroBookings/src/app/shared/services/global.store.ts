import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

type ApiStatus = 'idle' | 'loading' | 'resolved' | 'error';

// Definir el estado de la aplicación
export interface AppState {
  user?: UserTokenDto;
  // Añadir otros estados globales aquí
  apiStatus?: ApiStatus;
  lastApiRequestMs?: number;
  lastApiError?: string;
}

// Definir tipos de acciones
export type Action = { type: 'SET_USER'; payload: UserTokenDto } | { type: 'CLEAR_USER' };
export type ApiAction =
  | { type: 'API_REQUEST' }
  | { type: 'API_SUCCESS'; payload?: number }
  | { type: 'API_ERROR'; payload: string };

// Función reductora
function appReducer(state: AppState, action: Action | ApiAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: undefined };
    case 'API_REQUEST':
      return { ...state, apiStatus: 'loading', lastApiRequestMs: 0, lastApiError: undefined };
    case 'API_SUCCESS':
      return {
        ...state,
        apiStatus: 'resolved',
        lastApiRequestMs: action.payload,
        lastApiError: undefined,
      };
    case 'API_ERROR':
      return {
        ...state,
        apiStatus: 'error',
        lastApiRequestMs: undefined,
        lastApiError: action.payload,
      };
    default:
      return state;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  readonly #state$ = new BehaviorSubject<AppState>({});

  /**
   * Observable del estado completo
   */
  readonly state$: Observable<AppState> = this.#state$.asObservable();

  /**
   * Dispatch de una acción para actualizar el estado
   * @param action Acción a dispatch
   */
  dispatch(action: Action | ApiAction): void {
    const currentState = this.#state$.getValue();
    const newState = appReducer(currentState, action);
    this.#state$.next(newState);
  }

  /**
   * Selector para obtener una porción del estado
   * @param selector Función selector
   * @returns Observable de la porción seleccionada
   */
  select<K>(selector: (state: AppState) => K): Observable<K> {
    return this.#state$.pipe(map(selector), distinctUntilChanged());
  }
}
