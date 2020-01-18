import { MatchModel } from './match.model';

export interface CalendarModel {
  id?: number;
  seasonId?: number;
  matchs?: MatchModel[];
}
