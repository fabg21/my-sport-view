import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import { Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';

import * as playersActions from '../actions/players.action';
import * as fromServices from '../../services';


@Injectable()
export class PlayersEffect {
  constructor(
    private actions$: Actions,
    private playersService: fromServices.PlayersService
  ) {}

  @Effect()
  loadPlayers$ = this.actions$.pipe(
    ofType<playersActions.LoadPlayers>(playersActions.LOAD_PLAYERS),
    switchMap(x =>
      this.playersService.getAllPlayers().pipe(
        map(players => new playersActions.LoadPlayersSuccess(players)),
        catchError(error => of(new playersActions.LoadPlayersFail(error)))
      )
    )
  );
}
