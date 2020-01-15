import {PlayerModel} from './player.model';

export interface SeasonModel {
  id?: number;
  teamIdId?: number;
  start?: Date;
  end?: Date;
  current: boolean;
  players?: PlayerModel[];
}
