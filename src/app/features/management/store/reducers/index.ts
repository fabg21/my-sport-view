import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPlayers from './players.reducer';
import * as fromTeams from './teams.reducer';
import * as fromSeasons from './seasons.reducer';
import * as fromCalendars from './calendars.reducer';
import {CalendarModel} from '../../models/calendar.model';

export interface ManagementState {
  players: fromPlayers.PlayersState;
  teams: fromTeams.TeamsState;
  seasons: fromSeasons.SeasonsState;
  calendars: fromCalendars.CalendarsState;
}

export const reducers: ActionReducerMap<ManagementState> = {
  players: fromPlayers.reducer,
  teams: fromTeams.reducer,
  seasons: fromSeasons.reducer,
  calendars: fromCalendars.reducer
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
  fromPlayers.getAllPlayers
);

export const getAllPlayersEntities = createSelector(
  getPlayerState,
  fromPlayers.getPlayersEntities
);

export const getSelectedPlayerId = createSelector(
  getPlayerState,
  fromPlayers.getSelectedPlayerId
);

export const getSelectedPlayer = createSelector(
  getAllPlayersEntities,
  getSelectedPlayerId,
  (entities, selectedId) => entities && selectedId && entities[selectedId]
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
  fromTeams.getAllTeams
);

export const getTeamsLoaded = createSelector(
  getTeamsState,
  fromTeams.getTeamsLoaded
);

export const getTeamsLoading = createSelector(
  getTeamsState,
  fromTeams.getTeamsLoading
);

export const getAllTeamsEntities = createSelector(
  getTeamsState,
  fromTeams.getTeamsEntities
);

export const getSelectedTeamId = createSelector(
  getTeamsState,
  fromTeams.getSelectedTeamId
);

export const getSelectedTeam = createSelector(
  getAllTeamsEntities,
  getSelectedTeamId,
  (entities, selectedId) => entities && selectedId && entities[selectedId]
);

// Seasons state
export const getSeasonsState = createSelector(
  getManagementState,
  (state: ManagementState) => state.seasons
);

export const getAllSeasons = createSelector(
  getSeasonsState,
  fromSeasons.getAllSeasons
);

export const getSeasonsLoaded = createSelector(
  getSeasonsState,
  fromSeasons.getSeasonsLoaded
);

export const getSeasonsLoading = createSelector(
  getSeasonsState,
  fromSeasons.getSeasonsLoading
);

export const getAllSeasonsEntities = createSelector(
  getSeasonsState,
  fromSeasons.getSeasonsEntities
);

export const getSelectedSeasonId = createSelector(
  getSeasonsState,
  fromSeasons.getSelectedSeasonId
);

export const getSelectedSeason = createSelector(
  getAllSeasonsEntities,
  getSelectedSeasonId,
  (entities, selectedId) => {
    return entities && selectedId && entities[selectedId];
  }
);


// Calendars state
export const getCalendarsState = createSelector(
  getManagementState,
  (state: ManagementState) => state.calendars
);

export const getAllCalendars = createSelector(
  getCalendarsState,
  fromCalendars.getAllCalendars
);

export const getAllCalendarsEntities = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsEntities
);

export const getSelectedCalendarId = createSelector(
  getCalendarsState,
  fromCalendars.getSelectedCalendarId
);

export const getSelectedCalendar = createSelector(
  getAllCalendarsEntities,
  getSelectedCalendarId,
  (entities, selectedId) => entities && selectedId && entities[selectedId]
);

export const getCalendarsLoaded = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsLoaded
);

export const getCalendarsLoading = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsLoading
);

export const getCalendarFromSeason  = (seasonId: number) => createSelector(
  getAllCalendars,
  (calendars) => calendars && seasonId && calendars.find(
    calendar => calendar.seasonId && calendar.seasonId === seasonId)
);
