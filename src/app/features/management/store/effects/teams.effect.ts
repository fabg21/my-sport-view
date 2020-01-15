import {of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

import * as teamsActions from '../actions/teams.action';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';

@Injectable()
export class TeamsEffect {
  constructor(
    private actions$: Actions,
    private teamsService: fromServices.TeamsService,
    private store: Store<fromReducers.ManagementState>,
    private router: Router
  ) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<teamsActions.LoadTeams>(teamsActions.TeamsActionTypes.LOAD_TEAMS),
    switchMap(x =>
      this.teamsService.getAllTeams().pipe(
        map(teams => new teamsActions.LoadTeamsSuccess(teams)),
        catchError(error => of(new teamsActions.LoadTeamsFail(error)))
      )
    )
  );

  @Effect()
  addTeam$ = this.actions$.pipe(
    ofType<fromActions.AddTeam>(fromActions.TeamsActionTypes.ADD_TEAM),
    switchMap(({payload}) =>
      this.teamsService.createTeam(payload.teamData).pipe(
        map(team => new fromActions.AddTeamSuccess({team})),
        catchError(error => of(new fromActions.AddTeamFail(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addTeamSuccess$ = this.actions$.pipe(
    ofType<fromActions.AddTeamSuccess>(fromActions.TeamsActionTypes.ADD_TEAM_SUCCESS),
    map(() => this.router.navigateByUrl('/management/teams'))
  );

  @Effect()
  editTeam$ = this.actions$.pipe(
    ofType<fromActions.EditTeam>(fromActions.TeamsActionTypes.EDIT_TEAM),
    withLatestFrom(this.store.pipe(select(fromReducers.getSelectedTeamId))),
    filter(([{payload}, selectedId]) => !!selectedId),
    switchMap(([{payload}, selectedId]) => {
      const teamToEdit = {
        id: selectedId,
        ...payload.teamData
      };
      return this.teamsService.editTeam(teamToEdit).pipe(
        map(team => new fromActions.EditTeamSuccess({team})),
        catchError(error => of(new fromActions.EditTeamFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  editTeamSuccess$ = this.actions$.pipe(
    ofType<fromActions.EditTeamSuccess>(fromActions.TeamsActionTypes.EDIT_TEAM_SUCCESS),
    map(() => this.router.navigateByUrl('/management/teams'))
  );
}
