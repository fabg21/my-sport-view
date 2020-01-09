import {Action} from '@ngrx/store';

import {TeamModel} from '../../models/team.model';

// load teams
export const LOAD_TEAMS = '[TEAMS] Load Teams';
export const LOAD_TEAMS_FAIL = '[TEAMS] Load Teams Fail';
export const LOAD_TEAMS_SUCCESS = '[TEAMS] Load Teams Success';

export class LoadTeams implements Action {
  readonly type = LOAD_TEAMS;
}

export class LoadTeamsFail implements Action {
  readonly type = LOAD_TEAMS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadTeamsSuccess implements Action {
  readonly type = LOAD_TEAMS_SUCCESS;
  constructor(public  payload: TeamModel[]) {}
}

// action types
export type TeamsAction = LoadTeams | LoadTeamsFail | LoadTeamsSuccess;
