import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { environment } from '../../../../environments/environment';
import {MatchModel} from '../models/match.model';

@Injectable()
export class MatchesService extends BackendService {
  servicesApi = environment.servicesUrl;
  matchesUrl = this.servicesApi + '/mysportteam/api/matches';
  matchesFromCalendarUrl = this.servicesApi + '/mysportteam/api/matchesFromCalendar';

  getAllMatches(): Observable<MatchModel[]> {
    return this.get<MatchModel[]>(this.matchesUrl, false);
  }

  getAllMatchesFromCalendar(calendarId: string): Observable<MatchModel[]> {
    return this.get<MatchModel[]>(this.matchesFromCalendarUrl, false)
  }
}
