import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';

import * as teamsActions from '../actions/teams.action';
import * as fromServices from '../../services';


@Injectable()
export class TeamsEffect {
  constructor(
    private actions$: Actions,
    private teamsService: fromServices.TeamsService
  ) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<teamsActions.LoadTeams>(teamsActions.LOAD_TEAMS),
    switchMap(x =>
      this.teamsService.getAllTeams().pipe(
        map(teams => new teamsActions.LoadTeamsSuccess(teams)),
        catchError(error => of(new teamsActions.LoadTeamsFail(error)))
      )
    )
  );
}
