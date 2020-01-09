import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';

import * as incomingActions from '../actions/incomings.action';
import * as fromServices from '../../services';


@Injectable()
export class IncomingsEffect {
  constructor(
    private actions$: Actions,
    private incomingService: fromServices.IncomingsService
  ) {}

  @Effect()
  loadIncomings$ = this.actions$.pipe(
    ofType<incomingActions.LoadIncomings>(incomingActions.LOAD_INCOMINGS),
    switchMap(x =>
      this.incomingService.getAllIncomings().pipe(
        map(incomings => new incomingActions.LoadIncomingsSuccess(incomings)),
        catchError(error => of(new incomingActions.LoadIncomingsFail(error)))
      )
    )
  );
}
