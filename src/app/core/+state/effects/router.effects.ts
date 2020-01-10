import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as RouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigationEffect$ = this.actions$.pipe(
    ofType<RouterActions.Go>(RouterActions.RouterActionTypes.GO),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );
  @Effect({ dispatch: false })
  backEffect$ = this.actions$.pipe(
    ofType<RouterActions.Back>(RouterActions.RouterActionTypes.BACK),
    tap(() => this.location.back())
  );
  @Effect({ dispatch: false })
  forwardEffect$ = this.actions$.pipe(
    ofType<RouterActions.Forward>(RouterActions.RouterActionTypes.FORWARD),
    tap(() => this.location.forward())
  );
}
