import {Action} from '@ngrx/store';

import {TeamModel} from '../../models/team.model';

export enum TeamsActionTypes {
  LOAD_TEAMS = '[TEAMS] Load Teams',
  LOAD_TEAMS_FAIL = '[TEAMS] Load Teams Fail',
  LOAD_TEAMS_SUCCESS = '[TEAMS] Load Teams Success',
  SELECT_ONE_TEAM = '[TEAMS] Select One Team',
  ADD_TEAM = '[TEAMS] Add Team',
  ADD_TEAM_SUCCESS = '[TEAMS] Add Team Success',
  ADD_TEAM_FAIL = '[TEAMS] Add Team Fail',
  EDIT_TEAM = '[TEAMS] Edit Team',
  EDIT_TEAM_SUCCESS = '[TEAMS] Edit Team Success',
  EDIT_TEAM_FAIL = '[TEAMS] Edit Team Fail',
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
  constructor(public payload: { id: number }) {}
}

export class AddTeam implements Action {
  readonly type = TeamsActionTypes.ADD_TEAM;
  constructor(public payload: { teamData: TeamModel }) {}
}

export class AddTeamSuccess implements Action {
  readonly type = TeamsActionTypes.ADD_TEAM_SUCCESS;
  constructor(public payload: { team: TeamModel }) {}
}

export class AddTeamFail implements Action {
  readonly type = TeamsActionTypes.ADD_TEAM_FAIL;
  constructor(public payload: { error: any }) {}
}

export class EditTeam implements Action {
  readonly type = TeamsActionTypes.EDIT_TEAM;
  constructor(public payload: { teamData: TeamModel }) {}
}

export class EditTeamSuccess implements Action {
  readonly type = TeamsActionTypes.EDIT_TEAM_SUCCESS;
  constructor(public payload: { team: TeamModel }) {}
}

export class EditTeamFail implements Action {
  readonly type = TeamsActionTypes.EDIT_TEAM_FAIL;
  constructor(public payload: { error: any }) {}
}

// action types
export type TeamsAction =
  LoadTeams |
  LoadTeamsFail |
  LoadTeamsSuccess |
  SelectOneTeam |
  AddTeam |
  AddTeamFail |
  AddTeamSuccess |
  EditTeam |
  EditTeamSuccess |
  EditTeamFail;
