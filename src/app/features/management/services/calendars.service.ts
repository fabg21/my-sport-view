import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { environment } from '../../../../environments/environment';
import {CalendarModel} from '../models/calendar.model';
import {MatchModel} from '../models/match.model';
import {PlayerModel} from '../models/player.model';

@Injectable()
export class CalendarsService extends BackendService {
  servicesApi = environment.servicesUrl;
  calendarUrl = this.servicesApi + '/mysportteam/api/calendars';
  calendarFromSeasonUrl =  this.servicesApi + '/mysportteam/api/calendarFromSeason';

  getAllCalendars(): Observable<CalendarModel[]> {
    return this.get<CalendarModel[]>(this.calendarUrl, false);
  }

  getCalendarFromSeason(seasonId: number): Observable<CalendarModel> {
    return this.get<CalendarModel>(this.calendarFromSeasonUrl + '/' + seasonId, false);
  }

  mapCalendarWithNextMatches(calendar: CalendarModel): CalendarModel {
    const currentDate = new Date();
    return {
      ...calendar,
      matchs: calendar.matchs.filter(match => new Date(match.date).getTime() > currentDate.getTime())
    };
  }
}
