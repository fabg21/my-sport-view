import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';

@Injectable()
export class PlayersEffect {
  constructor(
    private actions$: Actions,
    private playersService: fromServices.PlayersService,
    private store: Store<fromReducers.ManagementState>,
    private router: Router
  ) {}

  @Effect()
  loadPlayers$ = this.actions$.pipe(
    ofType<fromActions.LoadPlayers>(fromActions.PlayersActionTypes.LOAD_PLAYERS),
    switchMap(x =>
      this.playersService.getAllPlayers().pipe(
        map(players => new fromActions.LoadPlayersSuccess({players})),
        catchError(error => of(new fromActions.LoadPlayersFail(error)))
      )
    )
  );

  @Effect()
  editPlayer$ = this.actions$.pipe(
    ofType<fromActions.EditPlayer>(fromActions.PlayersActionTypes.EDIT_PLAYER),
    withLatestFrom(this.store.pipe(select(fromReducers.getSelectedPlayerId))),
    filter(([{payload}, selectedId]) => !!selectedId),
    switchMap(([{payload}, selectedId]) => {
      const playerToEdit = {
        id: selectedId,
        ...payload.playerData
      };
      return this.playersService.editPlayer(playerToEdit).pipe(
        map(player => new fromActions.EditPlayerSuccess({player})),
        catchError(error => of(new fromActions.EditPlayerFail(error)))
      );
    })
  );

  @Effect()
  addPlayer$ = this.actions$.pipe(
    ofType<fromActions.AddPlayer>(fromActions.PlayersActionTypes.ADD_PLAYER),
    switchMap(({payload}) =>
      this.playersService.createPlayer(payload.playerData).pipe(
        map(player => new fromActions.AddPlayerSuccess({player})),
        catchError(error => of(new fromActions.AddPlayerFail(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addPlayerSuccess$ = this.actions$.pipe(
    ofType<fromActions.AddPlayerSuccess>(fromActions.PlayersActionTypes.ADD_PLAYER_SUCCESS),
    map(({payload}) => this.router.navigateByUrl('/management/players'))
  );

  @Effect({ dispatch: false })
  editPlayerSuccess$ = this.actions$.pipe(
    ofType<fromActions.EditPlayerSuccess>(fromActions.PlayersActionTypes.EDIT_PLAYER_SUCCESS),
    map(({payload}) => this.router.navigateByUrl('/management/players'))
  );
}
