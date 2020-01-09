import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';

import * as spendingActions from '../actions/spendings.action';
import * as fromServices from '../../services';


@Injectable()
export class SpendingsEffect {
  constructor(
    private actions$: Actions,
    private spendingService: fromServices.SpendingsService
  ) {}

  @Effect()
  loadIncomings$ = this.actions$.pipe(
    ofType<spendingActions.LoadSpendings>(spendingActions.LOAD_SPENDINGS),
    switchMap(x =>
      this.spendingService.getAllSpendings().pipe(
        map(spendings => new spendingActions.LoadSpendingsSuccess(spendings)),
        catchError(error => of(new spendingActions.LoadSpendingsFail(error)))
      )
    )
  );
}
