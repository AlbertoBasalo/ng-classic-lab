import { UserTokenDto } from '@app/models/user-token.dto';

type ApiStatus = 'idle' | 'loading' | 'resolved' | 'error';

/**
 * State of the application
 */
export interface AppState {
  user?: UserTokenDto;
  apiStatus?: ApiStatus;
  lastApiRequestMs?: number;
  lastApiError?: string;
}

/**
 * User actions
 */
export type UserAction = { type: 'SET_USER'; payload: UserTokenDto } | { type: 'CLEAR_USER' };

/**
 * API actions
 */
export type ApiAction =
  | { type: 'API_REQUEST' }
  | { type: 'API_SUCCESS'; payload?: number }
  | { type: 'API_ERROR'; payload: string };

type Action = UserAction | ApiAction;

/**
 * App reducer
 * - takes the current state and an action
 * - returns the new state as a mutated clone
 */
export function appReducer(state: AppState, action: Action): AppState {
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
