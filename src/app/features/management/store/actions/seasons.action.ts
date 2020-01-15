import { Action } from '@ngrx/store';

import {SeasonModel} from '../../models/season.model';

export enum SeasonsActionTypes {
  LOAD_SEASONS = '[SEASONS] Load Seasons',
  LOAD_SEASONS_FAIL = '[SEASONS] Load Seasons Fail',
  LOAD_SEASONS_SUCCESS = '[SEASONS] Load Seasons Success',
  SELECT_ONE_SEASON = '[SEASONS] Select One Season',
  ADD_SEASON = '[SEASONS] Add Season',
  ADD_SEASON_SUCCESS = '[SEASONS] Add Season Success',
  ADD_SEASON_FAIL = '[SEASONS] Add Season Fail',
  EDIT_SEASON = '[SEASONS] Edit Season',
  EDIT_SEASON_SUCCESS = '[SEASONS] Edit Season Success',
  EDIT_SEASON_FAIL = '[SEASONS] Edit Season Fail',
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
  constructor(public payload: { id: number }) {}
}

export class AddSeason implements Action {
  readonly type = SeasonsActionTypes.ADD_SEASON;
  constructor(public payload: { seasonData: SeasonModel }) {}
}

export class AddSeasonSuccess implements Action {
  readonly type = SeasonsActionTypes.ADD_SEASON_SUCCESS;
  constructor(public payload: { season: SeasonModel }) {}
}

export class AddSeasonFail implements Action {
  readonly type = SeasonsActionTypes.ADD_SEASON_FAIL;
  constructor(public payload: { error: any }) {}
}

export class EditSeason implements Action {
  readonly type = SeasonsActionTypes.EDIT_SEASON;
  constructor(public payload: { seasonData: SeasonModel }) {}
}

export class EditSeasonSuccess implements Action {
  readonly type = SeasonsActionTypes.EDIT_SEASON_SUCCESS;
  constructor(public payload: { season: SeasonModel }) {}
}

export class EditSeasonFail implements Action {
  readonly type = SeasonsActionTypes.EDIT_SEASON_FAIL;
  constructor(public payload: { error: any }) {}
}

// action types
export type SeasonsAction =
  LoadSeasons |
  LoadSeasonsFail |
  LoadSeasonsSuccess |
  SelectOneSeason |
  AddSeason |
  AddSeasonSuccess |
  AddSeasonFail |
  EditSeason |
  EditSeasonSuccess |
  EditSeasonFail;
