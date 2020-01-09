import * as fromIncomings from '../actions/incomings.action';
import {IncomingModel} from '../../model/incoming.model';

export interface IncomingState {
  data: IncomingModel[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: IncomingState = {
  data: [],
  loaded: false,
  loading: false
};

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
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromIncomings.LOAD_INCOMINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getIncomingsLoading = (state: IncomingState) => state.loading;
export const getIncomingsLoaded = (state: IncomingState) => state.loaded;
export const getIncomings = (state: IncomingState) => state.data;
