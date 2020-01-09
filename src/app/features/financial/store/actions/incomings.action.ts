import { Action } from '@ngrx/store';
import {IncomingModel} from '../../model/incoming.model';

// load incomings
export const LOAD_INCOMINGS = '[FINANCIAL] Load Incomings';
export const LOAD_INCOMINGS_FAIL = '[FINANCIAL] Load Incomings Fail';
export const LOAD_INCOMINGS_SUCCESS = '[FINANCIAL] Load Incomings Success';

export class LoadIncomings implements Action {
  readonly type = LOAD_INCOMINGS;
}

export class LoadIncomingsFail implements Action {
  readonly type = LOAD_INCOMINGS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadIncomingsSuccess implements Action {
  readonly type = LOAD_INCOMINGS_SUCCESS;
  constructor(public  payload: IncomingModel[]) {}
}

// action types
export type IncomingsAction = LoadIncomings | LoadIncomingsFail | LoadIncomingsSuccess;
