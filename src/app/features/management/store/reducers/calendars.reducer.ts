import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromCalendars from '../actions/calendars.action';
import { CalendarModel } from '../../models/calendar.model';

export interface CalendarsState extends EntityState<CalendarModel> {
  loaded: boolean;
  loading: boolean;
  selectedCalendarId: number;
}

export const calendarAdapter: EntityAdapter<CalendarModel> = createEntityAdapter<CalendarModel>();

export const initialState: CalendarsState =  calendarAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedCalendarId: null,
});

export function reducer(
  state = initialState,
  action: fromCalendars.CalendarsAction
): CalendarsState {
  switch (action.type) {
    case fromCalendars.CalendarActionTypes.LOAD_CALENDARS: {
      return {
        ...state,
        loading: true,
        selectedCalendarId: null
      };
    }

    case fromCalendars.CalendarActionTypes.LOAD_CALENDARS_SUCCESS: {
      return calendarAdapter.addMany(action.payload.calendars, { ...state, selectedCalendarId: null,  loading: false, loaded: true});
    }

    case fromCalendars.CalendarActionTypes.LOAD_CALENDARS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedCalendarId: null
      };
    }

    case fromCalendars.CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON: {
      return {
        ...state,
        loading: true,
        selectedCalendarId: null
      };
    }

    case fromCalendars.CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON_SUCCESS: {
      return calendarAdapter.addOne(action.payload.calendar,
        {...state, selectedCalendarId: action.payload.calendar.id,  loading: false, loaded: true});
    }

    case fromCalendars.CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        selectedCalendarId: null
      };
    }

    case fromCalendars.CalendarActionTypes.ADD_MATCH_TO_CALENDAR: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromCalendars.CalendarActionTypes.ADD_MATCH_TO_CALENDAR_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.match.calendarId]: {
            ...state.entities[action.payload.match.calendarId],
            matchs: [
              ...state.entities[action.payload.match.calendarId].matchs,
              action.payload.match
            ]
          }
        }
      };
    }

    case fromCalendars.CalendarActionTypes.ADD_MATCH_TO_CALENDAR_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

// selectors from entityAdapter
const { selectIds, selectEntities, selectAll, selectTotal } = calendarAdapter.getSelectors();

// select the array of players ids
export const getCalendarsIds = selectIds;

// select the dictionary of calendars entities
export const getCalendarsEntities = selectEntities;

// select the array of calendars
export const getAllCalendars = selectAll;

// select the total calendars count
export const getCalendarsTotal = selectTotal;

export const getCalendarsLoading = (state: CalendarsState) => state.loading;
export const getCalendarsLoaded = (state: CalendarsState) => state.loaded;
export const getSelectedCalendarId = (state: CalendarsState) => state.selectedCalendarId;
