import { MetaReducer, ActionReducerMap } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import * as fromRouter from './router.reducer';

export interface State {
  router: fromRouter.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export * from './router.reducer';
