import * as fromSpendings from '../actions/spendings.action';
import {SpendingsModel} from '../../model/spendings.model';

export interface SpendingState {
  data: SpendingsModel[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: SpendingState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromSpendings.SpendingsAction
): SpendingState {
  switch(action.type) {
    case fromSpendings.LOAD_SPENDINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromSpendings.LOAD_SPENDINGS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromSpendings.LOAD_SPENDINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getSpendingsLoading = (state: SpendingState) => state.loading;
export const getSpendingsLoaded = (state: SpendingState) => state.loaded;
export const getSpendings = (state: SpendingState) => state.data;
