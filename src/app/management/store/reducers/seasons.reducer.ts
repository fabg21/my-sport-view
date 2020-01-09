import * as fromSeasons from '../actions/seasons.action';
import {SeasonModel} from '../../models/season.model';

export interface SeasonsState {
  data: SeasonModel[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: SeasonsState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromSeasons.SeasonsAction
): SeasonsState {
  switch(action.type) {
    case fromSeasons.LOAD_SEASONS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromSeasons.LOAD_SEASONS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromSeasons.LOAD_SEASONS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getSeasonsLoading = (state: SeasonsState) => state.loading;
export const getSeasonsLoaded = (state: SeasonsState) => state.loaded;
export const getSeasons = (state: SeasonsState) => state.data;
