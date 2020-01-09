import * as fromPlayers from '../actions/players.action';
import {PlayerModel} from '../../models/player.model';

export interface PlayersState {
  data: PlayerModel[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PlayersState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPlayers.PlayersAction
): PlayersState {
  switch(action.type) {
    case fromPlayers.LOAD_PLAYERS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromPlayers.LOAD_PLAYERS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromPlayers.LOAD_PLAYERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getPlayersLoading = (state: PlayersState) => state.loading;
export const getPlayersLoaded = (state: PlayersState) => state.loaded;
export const getPlayers = (state: PlayersState) => state.data;
