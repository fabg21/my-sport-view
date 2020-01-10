import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../reducers';

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const getRouterUrlState = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.state
);

export const getUrl = createSelector(
  getRouterUrlState,
  (state: RouterStateUrl) => state.url
);

export const getQueryParams = createSelector(
  getRouterUrlState,
  (state: RouterStateUrl) => state.queryParams
);

export const getParams = createSelector(
  getRouterUrlState,
  (state: RouterStateUrl) => state.params
);
