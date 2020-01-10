import * as fromRouter from '@ngrx/router-store';

import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  data?: any;
}

export type State = fromRouter.RouterReducerState<RouterStateUrl>;

export const routerReducer = fromRouter.routerReducer;

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let { url } = routerState;

    // Default value added to fix ngrx bug. TODO: enable if needed
    // url = !!url ? url : '/';

    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params, data } = state;
    return { url, queryParams, params, data };
  }
}
