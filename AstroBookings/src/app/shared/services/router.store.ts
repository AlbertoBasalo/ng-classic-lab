import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Store } from './generic.store';

/**
 * The state type for the RouterStore
 */
type RouterState = {
  url: string;
  previousUrl: string;
  navigationCount: number;
}

/**
 * The initial state for the RouterStore
 */
const initialRouterState: RouterState = {
  url: '',
  previousUrl: '',
  navigationCount: 0,
};

/**
 * The action type for the RouterStore
 */
type RouterAction = {
  type: 'NAVIGATE';
  payload: {
    url: string;
  };
};

/**
 * The reducer for the RouterStore
 * @param state - The current state
 * @param action - The action to apply
 * @returns The new state
 */
const routerReducer = (state: RouterState, action: RouterAction): RouterState => {
  switch (action.type) {
    case 'NAVIGATE':
      const url = action.payload.url;
      const previousUrl = state.url;
      const navigationCount = state.navigationCount + 1;
      return { url, previousUrl, navigationCount };
  }
};

/**
 * A custom store for tracking navigation events
 * @extends Store With custom types
 * @see RouterState - The state type
 * @see RouterAction - The action type
 * @requires Router - The Angular Router service
 */
@Injectable({
  providedIn: 'root',
})
export class RouterStore extends Store<RouterState, RouterAction> {
  constructor(private router: Router) {
    super(initialRouterState, routerReducer);

    this.addNavigationEffect();

    this.pipeRouterEvents();
  }

  private addNavigationEffect(): void {
    const trigger = (state: RouterState) => state;
    const effect = (s: RouterState) => console.log('🗺️ Navigated from', s.previousUrl, 'to', s. url);
    this.addEffect<RouterState>(trigger, effect);  
  }

  private pipeRouterEvents(): void {
    this.router.events.pipe(
      filter((event: any): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.url),
    ).subscribe((url) => this.dispatch({ type: 'NAVIGATE', payload: { url } }));
  }
}
