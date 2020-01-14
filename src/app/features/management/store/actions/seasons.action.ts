import { Action } from '@ngrx/store';

import {SeasonModel} from '../../models/season.model';

export enum SeasonsActionTypes {
  LOAD_SEASONS = '[SEASONS] Load Seasons',
  LOAD_SEASONS_FAIL = '[SEASONS] Load Seasons Fail',
  LOAD_SEASONS_SUCCESS = '[SEASONS] Load Seasons Success',
  SELECT_ONE_SEASON = '[SEASONS] Select One Season',
}

export class LoadSeasons implements Action {
  readonly type = SeasonsActionTypes.LOAD_SEASONS;
}

export class LoadSeasonsFail implements Action {
  readonly type = SeasonsActionTypes.LOAD_SEASONS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadSeasonsSuccess implements Action {
  readonly type = SeasonsActionTypes.LOAD_SEASONS_SUCCESS;
  constructor(public  payload: SeasonModel[]) {}
}

export class SelectOneSeason implements Action {
  readonly type = SeasonsActionTypes.SELECT_ONE_SEASON;
  constructor(public payload: { id: string }) {}
}

// action types
export type SeasonsAction = LoadSeasons | LoadSeasonsFail | LoadSeasonsSuccess | SelectOneSeason;
