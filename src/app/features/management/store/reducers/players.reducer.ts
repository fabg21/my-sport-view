import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromPlayers from '../actions/players.action';
import { PlayerModel } from '../../models/player.model';

export interface PlayersState extends EntityState<PlayerModel> {
  loaded: boolean;
  loading: boolean;
  selectedPlayerId: number;
}

export const playerAdapter: EntityAdapter<PlayerModel> = createEntityAdapter<PlayerModel>();

export const initialState: PlayersState =  playerAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedPlayerId: null,
});

export function reducer(
  state = initialState,
  action: fromPlayers.PlayersAction
): PlayersState {
  switch (action.type) {
    case fromPlayers.PlayersActionTypes.LOAD_PLAYERS: {
      return {
        ...state,
        loading: true,
        selectedPlayerId: null
      };
    }

    case fromPlayers.PlayersActionTypes.LOAD_PLAYERS_SUCCESS: {
      return playerAdapter.addMany(action.payload.players, { ...state, selectedUserId: null,  loading: false, loaded: true});
    }

    case fromPlayers.PlayersActionTypes.LOAD_PLAYERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null
      };
    }

    case fromPlayers.PlayersActionTypes.SELECT_ONE_PLAYER: {
      return {
        ...state,
        selectedPlayerId: action.payload.id
      };
    }

    case fromPlayers.PlayersActionTypes.ADD_PLAYER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPlayers.PlayersActionTypes.ADD_PLAYER_SUCCESS: {
      return playerAdapter.upsertOne(action.payload.player, {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null,
      });
    }

    case fromPlayers.PlayersActionTypes.ADD_PLAYER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null
      };
    }

    case fromPlayers.PlayersActionTypes.EDIT_PLAYER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPlayers.PlayersActionTypes.EDIT_PLAYER_SUCCESS: {
      return playerAdapter.upsertOne(action.payload.player, {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null,
      });
    }

    case fromPlayers.PlayersActionTypes.EDIT_PLAYER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null
      };
    }

    case fromPlayers.PlayersActionTypes.DELETE_PLAYER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromPlayers.PlayersActionTypes.DELETE_PLAYER_SUCCESS: {
      return playerAdapter.removeOne(action.payload.id, {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null,
      });
    }

    case fromPlayers.PlayersActionTypes.DELETE_PLAYER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedPlayerId: null
      };
    }
  }
  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = playerAdapter.getSelectors();

// select the array of players ids
export const getPlayersIds = selectIds;

// select the dictionary of players entities
export const getPlayersEntities = selectEntities;

// select the array of players
export const getAllPlayers = selectAll;

// select the total players count
export const getPlayersTotal = selectTotal;

export const getPlayersLoading = (state: PlayersState) => state.loading;
export const getPlayersLoaded = (state: PlayersState) => state.loaded;
export const getSelectedPlayerId = (state: PlayersState) => state.selectedPlayerId;
