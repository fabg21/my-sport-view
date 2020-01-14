import {Action} from '@ngrx/store';

import {TeamModel} from '../../models/team.model';

export enum TeamsActionTypes {
  LOAD_TEAMS = '[TEAMS] Load Teams',
  LOAD_TEAMS_FAIL = '[TEAMS] Load Teams Fail',
  LOAD_TEAMS_SUCCESS = '[TEAMS] Load Teams Success',
  SELECT_ONE_TEAM = '[TEAMS] Select One Team',
}

export class LoadTeams implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS;
}

export class LoadTeamsFail implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_FAIL;
  constructor(public  payload: any) {}
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_SUCCESS;
  constructor(public  payload: TeamModel[]) {}
}

export class SelectOneTeam implements Action {
  readonly type = TeamsActionTypes.SELECT_ONE_TEAM;
  constructor(public payload: { id: string }) {}
}

// action types
export type TeamsAction = LoadTeams | LoadTeamsFail | LoadTeamsSuccess | SelectOneTeam;
