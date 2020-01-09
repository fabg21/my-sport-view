import { Action } from '@ngrx/store';
import {PlayerModel} from '../../models/player.model';

// load players
export const LOAD_PLAYERS = '[PLAYERS] Load Players';
export const LOAD_PLAYERS_FAIL = '[PLAYERS] Load Players Fail';
export const LOAD_PLAYERS_SUCCESS = '[PLAYERS] Load Players Success';

export class LoadPlayers implements Action {
  readonly type = LOAD_PLAYERS;
}

export class LoadPlayersFail implements Action {
  readonly type = LOAD_PLAYERS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadPlayersSuccess implements Action {
  readonly type = LOAD_PLAYERS_SUCCESS;
  constructor(public  payload: PlayerModel[]) {}
}

// action types
export type PlayersAction = LoadPlayers | LoadPlayersFail | LoadPlayersSuccess;
