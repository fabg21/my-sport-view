import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import * as fromTeams from '../actions/teams.action';
import {TeamModel} from '../../models/team.model';

export interface TeamsState extends EntityState<TeamModel> {
  loaded: boolean;
  loading: boolean;
  selectedTeamId: number;
}

export const teamAdapter: EntityAdapter<TeamModel> = createEntityAdapter<TeamModel>();

export const initialState: TeamsState = teamAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedTeamId: null,
});

export function reducer(
  state = initialState,
  action: fromTeams.TeamsAction
): TeamsState {
  switch(action.type) {
    case fromTeams.TeamsActionTypes.LOAD_TEAMS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromTeams.TeamsActionTypes.LOAD_TEAMS_SUCCESS: {
      return teamAdapter.addMany(action.payload, { ...state, selectedTeamId: null,  loading: false, loaded: true});
    }

    case fromTeams.TeamsActionTypes.LOAD_TEAMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedTeamId: null
      };
    }
  }
  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = teamAdapter.getSelectors();

// select the array of teams ids
export const getTeamsIds = selectIds;

// select the dictionary of teams entities
export const getTeamsEntities = selectEntities;

// select the array of teams
export const getAllTeams = selectAll;

// select the total teams count
export const getTeamsTotal = selectTotal;

export const getTeamsLoading = (state: TeamsState) => state.loading;
export const getTeamsLoaded = (state: TeamsState) => state.loaded;
