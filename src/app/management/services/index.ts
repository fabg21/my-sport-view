import {PlayersService} from './players.service';
import {ImageService} from './image.service';
import {TeamsService} from './teams.service';
import {SeasonsService} from './seasons.service';

export const services: any[] = [PlayersService, ImageService, TeamsService, SeasonsService];

export * from './players.service';
export * from './image.service';
export * from './teams.service';
export * from './seasons.service';
