import {of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import { Router } from '@angular/router';

import * as seasonsActions from '../actions/seasons.action';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import {select, Store} from '@ngrx/store';
import * as fromReducers from '../reducers';



@Injectable()
export class SeasonsEffect {
  constructor(
    private actions$: Actions,
    private seasonsService: fromServices.SeasonsService,
    private router: Router,
    private store: Store<fromReducers.ManagementState>,
  ) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<seasonsActions.LoadSeasons>(seasonsActions.SeasonsActionTypes.LOAD_SEASONS),
    switchMap(x =>
      this.seasonsService.getAllSeasons().pipe(
        map(seasons => new seasonsActions.LoadSeasonsSuccess(seasons)),
        catchError(error => of(new seasonsActions.LoadSeasonsFail(error)))
      )
    )
  );

  @Effect()
  addSeason$ = this.actions$.pipe(
    ofType<fromActions.AddSeason>(fromActions.SeasonsActionTypes.ADD_SEASON),
    switchMap(({payload}) =>
      this.seasonsService.createSeason(payload.seasonData).pipe(
        map(season => new fromActions.AddSeasonSuccess({season})),
        catchError(error => of(new fromActions.AddSeasonFail(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addSeasonSuccess$ = this.actions$.pipe(
    ofType<fromActions.AddSeasonSuccess>(fromActions.SeasonsActionTypes.ADD_SEASON_SUCCESS),
    map(() => this.router.navigateByUrl('/management/seasons'))
  );

  @Effect()
  editSeason$ = this.actions$.pipe(
    ofType<fromActions.EditSeason>(fromActions.SeasonsActionTypes.EDIT_SEASON),
    withLatestFrom(this.store.pipe(select(fromReducers.getSelectedSeasonId))),
    filter(([{payload}, selectedId]) => !!selectedId),
    switchMap(([{payload}, selectedId]) => {
      const seasonToEdit = {
        id: selectedId,
        ...payload.seasonData
      };
      return this.seasonsService.editSeason(seasonToEdit).pipe(
        map(season => new fromActions.EditSeasonSuccess({season})),
        catchError(error => of(new fromActions.EditSeasonFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  editSeasonSuccess$ = this.actions$.pipe(
    ofType<fromActions.EditSeasonSuccess>(fromActions.SeasonsActionTypes.EDIT_SEASON_SUCCESS),
    map(() => this.router.navigateByUrl('/management/seasons'))
  );
}
