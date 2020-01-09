import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { environment } from '../../../../environments/environment';
import { SeasonModel } from '../models/season.model';
import {TeamModel} from '../models/team.model';

@Injectable()
export class SeasonsService extends BackendService {
  servicesApi = environment.servicesUrl;
  teamUrl = this.servicesApi + '/mysportteam/api/seasons';

  getAllSeasons(): Observable<SeasonModel[]> {
    return this.get<SeasonModel[]>(this.teamUrl, false);
  }

  createSeason(season: SeasonModel): Observable<SeasonModel> {
    return this.post<SeasonModel>(this.teamUrl, null, season);
  }

  deleteSeason(id: number) {
    return this.delete(id, this.teamUrl);
  }

  editSeason(season: SeasonModel): Observable<SeasonModel> {
    return this.put(this.teamUrl, null, season);
  }
}
