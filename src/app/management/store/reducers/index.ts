import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlayers from './players.reducer';
import * as fromTeams from './teams.reducer';
import * as fromSeasons from './seasons.reducer';

export interface ManagementState {
  players: fromPlayers.PlayersState;
  teams: fromTeams.TeamsState;
  seasons: fromSeasons.SeasonsState;
}

export const reducers: ActionReducerMap<ManagementState> = {
  players: fromPlayers.reducer,
  teams: fromTeams.reducer,
  seasons: fromSeasons.reducer
};

export const getManagementState = createFeatureSelector<ManagementState>(
  'management'
);

// Players state
export const getPlayerState = createSelector(
  getManagementState,
  (state: ManagementState) => state.players
);

export const getAllPlayers = createSelector(
  getPlayerState,
  fromPlayers.getPlayers
);

export const getSelectedPlayer = createSelector(
  getAllPlayers,
  (players, props) => players.find(player => player.id === props.id)
);

export const getPlayersLoaded = createSelector(
  getPlayerState,
  fromPlayers.getPlayersLoaded
);

export const getPlayersLoading = createSelector(
  getPlayerState,
  fromPlayers.getPlayersLoading
);


// Teams state
export const getTeamsState = createSelector(
  getManagementState,
  (state: ManagementState) => state.teams
);

export const getAllTeams = createSelector(
  getTeamsState,
  fromTeams.getTeams
);

export const getTeamsLoaded = createSelector(
  getTeamsState,
  fromTeams.getTeamsLoaded
);

export const getTeamsLoading = createSelector(
  getTeamsState,
  fromTeams.getTeamsLoading
);

export const getSelectedTeam = createSelector(
  getAllTeams,
  (teams, props) => teams.find(team => team.id === props.id)
);


// Seasons state
export const getSeasonsState = createSelector(
  getManagementState,
  (state: ManagementState) => state.seasons
);

export const getAllSeasons = createSelector(
  getSeasonsState,
  fromSeasons.getSeasons
);

export const getSeasonsLoaded = createSelector(
  getSeasonsState,
  fromSeasons.getSeasonsLoaded
);

export const getSeasonsLoading = createSelector(
  getSeasonsState,
  fromSeasons.getSeasonsLoading
);
