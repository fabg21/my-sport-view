import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { environment } from '../../../../environments/environment';
import { OpposingTeamModel } from '../models/opposingTeam.model';

@Injectable()
export class OpposingTeamsService extends BackendService {
  servicesApi = environment.servicesUrl;
  opposingTeamsUrl = this.servicesApi + '/mysportteam/api/opposing-teams';

  getAllOpposingTeams(): Observable<OpposingTeamModel[]> {
    return this.get<OpposingTeamModel[]>(this.opposingTeamsUrl, false);
  }
}
