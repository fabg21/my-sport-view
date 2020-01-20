import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable} from '@angular/core';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class OpposingTeamsEffect {
  constructor(
    private actions$: Actions,
    private opposingTeamsService: fromServices.OpposingTeamsService,
  ) {}

  @Effect()
  loadOpposingTeams$ = this.actions$.pipe(
    ofType<fromActions.LoadOpposingTeams>(fromActions.OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS),
    switchMap(x =>
      this.opposingTeamsService.getAllOpposingTeams().pipe(
        map(teams => new fromActions.LoadOpposingTeamsSuccess({teams})),
        catchError(error => of(new fromActions.LoadOpposingTeamsFail(error)))
      )
    )
  );
}
