import { UserTokenDto } from '@app/models/user-token.dto';
/**
 * The type for the global state values
 */
export type GlobalState = {
  userToken: UserTokenDto | undefined;
  lastApiError: string;
  lastApiMs: number;
  apiStatus: ApiStatus;
};

/**
 * The initial state for the global state to avoid undefined values
 */
export const initialGlobalState: GlobalState = {
  userToken: undefined,
  lastApiError: '',
  lastApiMs: 0,
  apiStatus: 'idle',
};

/**
 * The type for the API status
 */
type ApiStatus = 'idle' | 'loading' | 'error' | 'complete';

/**
 * Basic interface for the actions
 */
interface Action {
  type: string;
  payload?: any;
}

/**
 * Actions related to the user
 */
interface UserAction extends Action {
  type: 'LOGIN' | 'LOGOUT';
  payload?: UserTokenDto;
}

interface ApiLoadingAction extends Action {
  type: 'API_REQUEST';
}

interface ApiErrorAction extends Action {
  type: 'API_ERROR';
  payload: string;
}

interface ApiCompleteAction extends Action {
  type: 'API_SUCCESS';
  payload: number;
}

/**
 * The union type for all the actions related to the API
 */
type ApiAction = ApiErrorAction | ApiCompleteAction | ApiLoadingAction;

/**
 * The union type for all the actions that can be dispatched
 */
export type GlobalAction = UserAction | ApiAction;

/**
 * Function to apply the actions to the state.
 * - Mutates the state by generating a new one after applying the action
 * - It is called by the store to update the state when a new action is dispatched
 * @param state The current state
 * @param action The action to apply
 * @returns The new state (cloned)
 */
export function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userToken: action.payload };
    case 'LOGOUT':
      return { ...state, userToken: undefined };
    case 'API_REQUEST':
      return { ...state, apiStatus: 'loading' };
    case 'API_ERROR':
      return { ...state, lastApiError: action.payload, apiStatus: 'error' };
    case 'API_SUCCESS':
      return { ...state, lastApiMs: action.payload, apiStatus: 'complete' };
    default:
      return { ...state };
  }
}
