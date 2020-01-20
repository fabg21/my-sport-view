import {PlayersService} from './players.service';
import {ImageService} from './image.service';
import {TeamsService} from './teams.service';
import {SeasonsService} from './seasons.service';
import {CalendarsService} from './calendars.service';
import {MatchesService} from './matches.service';
import {OpposingTeamsService} from './opposingTeams.service';

export const services: any[] = [PlayersService, ImageService, TeamsService, SeasonsService, CalendarsService, MatchesService, OpposingTeamsService];

export * from './players.service';
export * from './image.service';
export * from './teams.service';
export * from './seasons.service';
export * from './calendars.service';
export * from './matches.service';
export * from './opposingTeams.service';
