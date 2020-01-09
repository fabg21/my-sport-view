import * as fromTeams from '../actions/teams.action';
import {TeamModel} from '../../models/team.model';

export interface TeamsState {
  data: TeamModel[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TeamsState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromTeams.TeamsAction
): TeamsState {
  switch(action.type) {
    case fromTeams.LOAD_TEAMS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromTeams.LOAD_TEAMS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromTeams.LOAD_TEAMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getTeamsLoading = (state: TeamsState) => state.loading;
export const getTeamsLoaded = (state: TeamsState) => state.loaded;
export const getTeams = (state: TeamsState) => state.data;
