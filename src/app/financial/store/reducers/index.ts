import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIncominngs from './incomings.reducer';
import * as fromSpendings from './spendings.reducer';

export interface FinancialState {
  incomings: fromIncominngs.IncomingState;
  spendings: fromSpendings.SpendingState;
}

export const reducers: ActionReducerMap<FinancialState> = {
  incomings: fromIncominngs.reducer,
  spendings: fromSpendings.reducer
};

export const getFinancialState = createFeatureSelector<FinancialState>(
  'financial'
);

// Incomings state
export const getIncomingState = createSelector(
  getFinancialState,
  (state: FinancialState) => state.incomings
);

export const getAllIncomings = createSelector(
  getIncomingState,
  fromIncominngs.getIncomings
);

export const getIncomingsLoaded = createSelector(
  getIncomingState,
  fromIncominngs.getIncomingsLoaded
);

export const getIncomingsLoading = createSelector(
  getIncomingState,
  fromIncominngs.getIncomingsLoading
);

// Spending state
export const getSpendingState = createSelector(
  getFinancialState,
  (state: FinancialState) => state.spendings
);

export const getAllSpendings = createSelector(
  getSpendingState,
  fromSpendings.getSpendings
);

export const getSpendingsLoaded = createSelector(
  getSpendingState,
  fromSpendings.getSpendingsLoaded
);

export const getSpendingsLoading = createSelector(
  getSpendingState,
  fromIncominngs.getIncomingsLoading
);
