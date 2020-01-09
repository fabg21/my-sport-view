import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';

import * as seasonsActions from '../actions/seasons.action';
import * as fromServices from '../../services';


@Injectable()
export class SeasonsEffect {
  constructor(
    private actions$: Actions,
    private seasonsService: fromServices.SeasonsService
  ) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<seasonsActions.LoadSeasons>(seasonsActions.LOAD_SEASONS),
    switchMap(x =>
      this.seasonsService.getAllSeasons().pipe(
        map(seasons => new seasonsActions.LoadSeasonsSuccess(seasons)),
        catchError(error => of(new seasonsActions.LoadSeasonsFail(error)))
      )
    )
  );
}
