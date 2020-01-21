import { Action } from '@ngrx/store';

import {CalendarModel} from '../../models/calendar.model';
import {MatchModel} from '../../models/match.model';

export enum CalendarActionTypes {
  LOAD_CALENDARS = '[CALENDAR] Load Calendars',
  LOAD_CALENDARS_FAIL = '[CALENDAR] Load Calendars Fail',
  LOAD_CALENDARS_SUCCESS = '[CALENDAR] Load Calendars Success',

  LOAD_CALENDAR_FROM_SEASON = '[CALENDAR] Load Calendar from Season',
  LOAD_CALENDAR_FROM_SEASON_FAIL = '[CALENDAR] Load Calendar from season Fail',
  LOAD_CALENDAR_FROM_SEASON_SUCCESS = '[CALENDAR] Load Calendar from Season Success',

  ADD_MATCH_TO_CALENDAR = '[CALENDAR] Add Match to Calendar',
  ADD_MATCH_TO_CALENDAR_FAIL = '[CALENDAR] Add Match to Calendar Fail',
  ADD_MATCH_TO_CALENDAR_SUCCESS = '[CALENDAR] Add Match to Calendar Success',
}

export class LoadCalendars implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDARS;
}

export class LoadCalendarsFail implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDARS_FAIL;
  constructor(public  payload: { error: any }) {}
}

export class LoadCalendarsSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDARS_SUCCESS;
  constructor(public  payload: {calendars: CalendarModel[]}) {}
}

export class LoadCalendarFromSeason implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON;
  constructor(public  payload: { seasonId: number }) {}
}

export class LoadCalendarFromSeasonFail implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON_FAIL;
  constructor(public  payload: { error: any }) {}
}

export class LoadCalendarFromSeasonSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON_SUCCESS;
  constructor(public  payload: {calendar: CalendarModel}) {}
}

export class AddMatchToCalendar implements Action {
  readonly type = CalendarActionTypes.ADD_MATCH_TO_CALENDAR;
  constructor(public  payload: { match: MatchModel }) {}
}

export class AddMatchToCalendarFail implements Action {
  readonly type = CalendarActionTypes.ADD_MATCH_TO_CALENDAR_FAIL;
  constructor(public  payload: { error: any }) {}
}

export class AddMatchToCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.ADD_MATCH_TO_CALENDAR_SUCCESS;
  constructor(public  payload: {match: MatchModel}) {}
}

// action types
export type CalendarsAction =
  LoadCalendars |
  LoadCalendarsFail |
  LoadCalendarsSuccess |
  LoadCalendarFromSeason |
  LoadCalendarFromSeasonFail |
  LoadCalendarFromSeasonSuccess |
  AddMatchToCalendar |
  AddMatchToCalendarFail |
  AddMatchToCalendarSuccess;
