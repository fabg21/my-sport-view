import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { environment } from '../../../../environments/environment';
import { SeasonModel } from '../models/season.model';

@Injectable()
export class SeasonsService extends BackendService {
  servicesApi = environment.servicesUrl;
  teamUrl = this.servicesApi + '/mysportteam/api/seasons';

  getAllSeasons(): Observable<SeasonModel[]> {
    return this.get<SeasonModel[]>(this.teamUrl, false);
  }
}
