import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromOpposingTeams from '../actions/opposingTeams.action';
import { CalendarModel } from '../../models/calendar.model';
import {OpposingTeamModel} from '../../models/opposingTeam.model';

export interface OpposingTeampsState extends EntityState<OpposingTeamModel> {
  loaded: boolean;
  loading: boolean;
}

export const opposingTeamsAdapter: EntityAdapter<OpposingTeamModel> = createEntityAdapter<OpposingTeamModel>();

export const initialState: OpposingTeampsState =  opposingTeamsAdapter.getInitialState({
  loaded: false,
  loading: false,
});

export function reducer(
  state = initialState,
  action: fromOpposingTeams.OpposingTeamsAction
): OpposingTeampsState {
  switch (action.type) {
    case fromOpposingTeams.OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromOpposingTeams.OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS_SUCCESS: {
      return opposingTeamsAdapter.addMany(action.payload.teams, { ...state,  loading: false, loaded: true});
    }

    case fromOpposingTeams.OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }

  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = opposingTeamsAdapter.getSelectors();

// select the array of players ids
export const getOpposingTeamsIds = selectIds;

// select the dictionary of calendars entities
export const getOpposingTeamsEntities = selectEntities;

// select the array of calendars
export const getAllOpposingTeams = selectAll;

// select the total calendars count
export const getOpposingTeamsTotal = selectTotal;

export const getOpposingTeamsLoading = (state: OpposingTeampsState) => state.loading;
export const getOpposingTeamsLoaded = (state: OpposingTeampsState) => state.loaded;
