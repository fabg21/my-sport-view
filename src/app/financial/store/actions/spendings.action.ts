import {Action} from '@ngrx/store';
import {SpendingsModel} from '../../model/spendings.model';

// load spendings
export const LOAD_SPENDINGS = '[FINANCIAL] Load Spendings';
export const LOAD_SPENDINGS_FAIL = '[FINANCIAL] Load Spendings Fail';
export const LOAD_SPENDINGS_SUCCESS = '[FINANCIAL] Load SPendings Success';

export class LoadSpendings implements Action {
  readonly type = LOAD_SPENDINGS;
}

export class LoadSpendingsFail implements Action {
  readonly type = LOAD_SPENDINGS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadSpendingsSuccess implements Action {
  readonly type = LOAD_SPENDINGS_SUCCESS;
  constructor(public  payload: SpendingsModel[]) {}
}

// action types
export type SpendingsAction = LoadSpendings | LoadSpendingsFail | LoadSpendingsSuccess;
