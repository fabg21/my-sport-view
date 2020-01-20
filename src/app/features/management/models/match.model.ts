export interface MatchModel {
  id?: number;
  type?: string;
  date?: Date;
  appointmentHour?: string;
  startTime?: Date;
  place?: string;
  result?: number;
  scoreFor?: number;
  scoreAgainst?: string;
  opponentId?: number;
}
