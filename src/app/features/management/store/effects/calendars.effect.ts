import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable} from '@angular/core';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class CalendarsEffect {
  constructor(
    private actions$: Actions,
    private calendarService: fromServices.CalendarsService,
    private matchesService: fromServices.MatchesService
  ) {}

  @Effect()
  loadCalendars$ = this.actions$.pipe(
    ofType<fromActions.LoadCalendars>(fromActions.CalendarActionTypes.LOAD_CALENDARS),
    switchMap(x =>
      this.calendarService.getAllCalendars().pipe(
        map(calendars => new fromActions.LoadCalendarsSuccess({calendars})),
        catchError(error => of(new fromActions.LoadCalendarsFail(error)))
      )
    )
  );

  @Effect()
  loadCalendarFromSeason$ = this.actions$.pipe(
    ofType<fromActions.LoadCalendarFromSeason>(fromActions.CalendarActionTypes.LOAD_CALENDAR_FROM_SEASON),
    switchMap(({payload}) =>
      this.calendarService.getCalendarFromSeason(payload.seasonId).pipe(
        map(calendar => new fromActions.LoadCalendarFromSeasonSuccess({calendar})),
        catchError(error => of(new fromActions.LoadCalendarFromSeasonFail(error)))
      )
    )
  );

  @Effect()
  addMatchToCalendar$ = this.actions$.pipe(
    ofType<fromActions.AddMatchToCalendar>(fromActions.CalendarActionTypes.ADD_MATCH_TO_CALENDAR),
    switchMap(({payload}) =>
      this.matchesService.createMatch(payload.match).pipe(
        map(match => new fromActions.AddMatchToCalendarSuccess({match})),
        catchError(error => of(new fromActions.AddMatchToCalendarFail(error)))
      )
    )
  );
}
