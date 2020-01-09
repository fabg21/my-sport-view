import {PlayerListComponent} from './player-list/player-list.component';
import {CreatePlayerComponent} from './create-player/create-player.component';
import {EditPlayerComponent} from './edit-player/edit-player.component';
import {TeamListComponent} from './team-list/team-list.component';
import {CreateTeamComponent} from './create-team/create-team.component';
import {EditTeamComponent} from './edit-team/edit-team.component';
import {SeasonsComponent} from './seasons/seasons.component';
import {SeasonComponent} from './season/season.component';

export const containers: any[] = [
  PlayerListComponent,
  CreatePlayerComponent,
  EditPlayerComponent,
  TeamListComponent,
  CreateTeamComponent,
  EditTeamComponent,
  SeasonsComponent,
  SeasonComponent
];

export * from './player-list/player-list.component';
export * from './create-player/create-player.component';
export * from './edit-player/edit-player.component';
export * from './team-list/team-list.component';
export * from './create-team/create-team.component';
export * from './edit-team/edit-team.component';
export * from './seasons/seasons.component';
export * from './season/season.component';
