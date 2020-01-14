import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromIncomings from '../actions/incomings.action';
import {IncomingModel} from '../../model/incoming.model';

export interface IncomingState extends EntityState<IncomingModel> {
  loaded: boolean;
  loading: boolean;
  selectedIncomingId: number;
}

export const incomingAdapter: EntityAdapter<IncomingModel> = createEntityAdapter<IncomingModel>();

export const initialState: IncomingState = incomingAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedIncomingId: null,
});

export function reducer(
  state = initialState,
  action: fromIncomings.IncomingsAction
): IncomingState {
  switch(action.type) {
    case fromIncomings.LOAD_INCOMINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromIncomings.LOAD_INCOMINGS_SUCCESS: {
      return incomingAdapter.addMany(action.payload, { ...state, selectedIncomingId: null,  loading: false, loaded: true});
    }

    case fromIncomings.LOAD_INCOMINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedIncomingId: null
      };
    }
  }
  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = incomingAdapter.getSelectors();

// select the array of incoming ids
export const getIncomingsIds = selectIds;

// select the dictionary of incoming entities
export const getIncomingsEntities = selectEntities;

// select the array of incoming
export const getAllIncomings = selectAll;

// select the total incoming count
export const getIncomingsTotal = selectTotal;

export const getIncomingsLoading = (state: IncomingState) => state.loading;
export const getIncomingsLoaded = (state: IncomingState) => state.loaded;
