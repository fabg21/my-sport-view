import { PlayersEffect } from './players.effect';
import { TeamsEffect } from './teams.effect';
import { SeasonsEffect } from './seasons.effect';
import {CalendarsEffect} from './calendars.effect';
import {OpposingTeamsEffect} from './opposingTeams.effect';

export const effects: any[] = [PlayersEffect, TeamsEffect, SeasonsEffect, CalendarsEffect, OpposingTeamsEffect];

export * from './players.effect';
export * from './teams.effect';
export * from './seasons.effect';
export * from './calendars.effect';
export * from './opposingTeams.effect';
