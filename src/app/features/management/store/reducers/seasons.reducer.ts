import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromSeasons from '../actions/seasons.action';
import { SeasonModel } from '../../models/season.model';

export interface SeasonsState extends EntityState<SeasonModel> {
  loaded: boolean;
  loading: boolean;
  selectedSeasonId: number;
}

export const seasonAdapter: EntityAdapter<SeasonModel> = createEntityAdapter<SeasonModel>();

export const initialState: SeasonsState =   seasonAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedSeasonId: null,
});

export function reducer(
  state = initialState,
  action: fromSeasons.SeasonsAction
): SeasonsState {
  switch (action.type) {
    case fromSeasons.SeasonsActionTypes.LOAD_SEASONS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromSeasons.SeasonsActionTypes.LOAD_SEASONS_SUCCESS: {
      return seasonAdapter.addMany(action.payload, { ...state, selectedSeasonId: null,  loading: false, loaded: true});
    }

    case fromSeasons.SeasonsActionTypes.LOAD_SEASONS_FAIL: {
      return {
        ...state,
        selectedSeasonId: null,
        loading: false,
        loaded: false
      };
    }

    case fromSeasons.SeasonsActionTypes.SELECT_ONE_SEASON: {
      return {
        ...state,
        selectedSeasonId: action.payload.id
      };
    }

    case fromSeasons.SeasonsActionTypes.ADD_SEASON: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromSeasons.SeasonsActionTypes.ADD_SEASON_SUCCESS: {
      return seasonAdapter.upsertOne(action.payload.season, {
        ...state,
        loading: false,
        loaded: false,
        selectedSeasonId: null,
      });
    }

    case fromSeasons.SeasonsActionTypes.ADD_SEASON_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedSeasonId: null
      };
    }

    case fromSeasons.SeasonsActionTypes.EDIT_SEASON: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromSeasons.SeasonsActionTypes.EDIT_SEASON_SUCCESS: {
      return seasonAdapter.upsertOne(action.payload.season, {
        ...state,
        loading: false,
        loaded: false,
        selectedSeasonId: null,
      });
    }

    case fromSeasons.SeasonsActionTypes.EDIT_SEASON_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedSeasonId: null
      };
    }
  }
  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = seasonAdapter.getSelectors();

// select the array of seasons ids
export const getSeasonsIds = selectIds;

// select the dictionary of seasons entities
export const getSeasonsEntities = selectEntities;

// select the array of seasons
export const getAllSeasons = selectAll;

// select the total seasons count
export const getSeasonsTotal = selectTotal;

export const getSeasonsLoading = (state: SeasonsState) => state.loading;
export const getSeasonsLoaded = (state: SeasonsState) => state.loaded;
export const getSelectedSeasonId = (state: SeasonsState) => state.selectedSeasonId;
