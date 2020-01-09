import { Action } from '@ngrx/store';

import {SeasonModel} from '../../models/season.model';

// load seasons
export const LOAD_SEASONS = '[SEASONS] Load Seasons';
export const LOAD_SEASONS_FAIL = '[SEASONS] Load Seasons Fail';
export const LOAD_SEASONS_SUCCESS = '[SEASONS] Load Seasons Success';

export class LoadSeasons implements Action {
  readonly type = LOAD_SEASONS;
}

export class LoadSeasonsFail implements Action {
  readonly type = LOAD_SEASONS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadSeasonsSuccess implements Action {
  readonly type = LOAD_SEASONS_SUCCESS;
  constructor(public  payload: SeasonModel[]) {}
}

// action types
export type SeasonsAction = LoadSeasons | LoadSeasonsFail | LoadSeasonsSuccess;
