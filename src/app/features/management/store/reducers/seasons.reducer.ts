import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromSeasons from '../actions/seasons.action';
import { SeasonModel } from '../../models/season.model';
import {playerAdapter} from './players.reducer';

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
