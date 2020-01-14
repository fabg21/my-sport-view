import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromSpendings from '../actions/spendings.action';
import {SpendingsModel} from '../../model/spendings.model';

export interface SpendingState extends EntityState<SpendingsModel> {
  loaded: boolean;
  loading: boolean;
  selectedSpendingId: number;
}

export const spendingAdapter: EntityAdapter<SpendingsModel> = createEntityAdapter<SpendingsModel>();

export const initialState: SpendingState = spendingAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedSpendingId: null,
});

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
      return spendingAdapter.addMany(action.payload, { ...state, selectedSpendingId: null,  loading: false, loaded: true});
    }

    case fromSpendings.LOAD_SPENDINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedSpendingId: null
      };
    }
  }
  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = spendingAdapter.getSelectors();

// select the array of spendings ids
export const getSpendingsIds = selectIds;

// select the dictionary of spendings entities
export const getSpendingsEntities = selectEntities;

// select the array of spendings
export const getAllSpendings = selectAll;

// select the total spendings count
export const getSpendingsTotal = selectTotal;

export const getSpendingsLoading = (state: SpendingState) => state.loading;
export const getSpendingsLoaded = (state: SpendingState) => state.loaded;
