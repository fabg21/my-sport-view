import { Action } from '@ngrx/store';

import {PlayerModel} from '../../models/player.model';

export enum PlayersActionTypes {
  LOAD_PLAYERS = '[PLAYERS] Load Players',
  LOAD_PLAYERS_FAIL = '[PLAYERS] Load Players Fail',
  LOAD_PLAYERS_SUCCESS = '[PLAYERS] Load Players Success',
  SELECT_ONE_PLAYER = '[PLAYERS] Select One Player',
  EDIT_PLAYER = '[PLAYERS] Edit Player',
  EDIT_PLAYER_SUCCESS = '[PLAYERS] Edit Player Success',
  EDIT_PLAYER_FAIL = '[PLAYERS] Edit Player Fail',
  ADD_PLAYER = '[PLAYERS] Add Player',
  ADD_PLAYER_SUCCESS = '[PLAYERS] Add Player Success',
  ADD_PLAYER_FAIL = '[PLAYERS] Add Player Fail',
  DELETE_PLAYER = '[PLAYERS] Delete Player',
  DELETE_PLAYER_SUCCESS = '[PLAYERS] Delete Player Success',
  DELETE_PLAYER_FAIL = '[PLAYERS] Delete Player Fail',
}

export class LoadPlayers implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS;
}

export class LoadPlayersFail implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_FAIL;
  constructor(public  payload: { error: any }) {}
}

export class LoadPlayersSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_SUCCESS;
  constructor(public  payload: {players: PlayerModel[]}) {}
}

export class SelectOnePlayer implements Action {
  readonly type = PlayersActionTypes.SELECT_ONE_PLAYER;
  constructor(public payload: { id: number }) {}
}

export class EditPlayer implements Action {
  readonly type = PlayersActionTypes.EDIT_PLAYER;
  constructor(public payload: { playerData: PlayerModel }) {}
}

export class EditPlayerSuccess implements Action {
  readonly type = PlayersActionTypes.EDIT_PLAYER_SUCCESS;
  constructor(public payload: { player: PlayerModel }) {}
}

export class EditPlayerFail implements Action {
  readonly type = PlayersActionTypes.EDIT_PLAYER_FAIL;
  constructor(public payload: { error: any }) {}
}

export class AddPlayer implements Action {
  readonly type = PlayersActionTypes.ADD_PLAYER;
  constructor(public payload: { playerData: PlayerModel }) {}
}

export class AddPlayerSuccess implements Action {
  readonly type = PlayersActionTypes.ADD_PLAYER_SUCCESS;
  constructor(public payload: { player: PlayerModel }) {}
}

export class AddPlayerFail implements Action {
  readonly type = PlayersActionTypes.ADD_PLAYER_FAIL;
  constructor(public payload: { error: any }) {}
}

export class DeletePlayer implements Action {
  readonly type = PlayersActionTypes.DELETE_PLAYER;
  constructor(public payload: { id: number }) {}
}

export class DeletePlayerSuccess implements Action {
  readonly type = PlayersActionTypes.DELETE_PLAYER_SUCCESS;
  constructor(public payload: { id: number }) {}
}

export class DeletePlayerFail implements Action {
  readonly type = PlayersActionTypes.DELETE_PLAYER_FAIL;
  constructor(public payload: { error: any }) {}
}

// action types
export type PlayersAction =
  LoadPlayers |
  LoadPlayersFail |
  LoadPlayersSuccess |
  SelectOnePlayer |
  AddPlayer |
  AddPlayerSuccess |
  AddPlayerFail |
  EditPlayer |
  EditPlayerSuccess |
  EditPlayerFail |
  DeletePlayer |
  DeletePlayerSuccess |
  DeletePlayerFail;
