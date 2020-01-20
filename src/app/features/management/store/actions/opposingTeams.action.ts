import { Action } from '@ngrx/store';

import {CalendarModel} from '../../models/calendar.model';
import {OpposingTeamModel} from '../../models/opposingTeam.model';

export enum OpposingTeamsActionTypes {
  LOAD_OPPOSING_TEAMS = '[OPPOSING TEAMS] Load Opposing Teams',
  LOAD_OPPOSING_TEAMS_FAIL = '[OPPOSING TEAMS] Load Opposing Teams Fail',
  LOAD_OPPOSING_TEAMS_SUCCESS = '[OPPOSING TEAMS] Load Opposing Teams Success',
}

export class LoadOpposingTeams implements Action {
  readonly type = OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS;
}

export class LoadOpposingTeamsFail implements Action {
  readonly type = OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS_FAIL;
  constructor(public  payload: { error: any }) {}
}

export class LoadOpposingTeamsSuccess implements Action {
  readonly type = OpposingTeamsActionTypes.LOAD_OPPOSING_TEAMS_SUCCESS;
  constructor(public  payload: {teams: OpposingTeamModel[]}) {}
}

// action types
export type OpposingTeamsAction =
  LoadOpposingTeams |
  LoadOpposingTeamsFail |
  LoadOpposingTeamsSuccess;
