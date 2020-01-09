import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../common/service/backend.service';
import { environment } from '../../../environments/environment';
import {TeamModel} from '../models/team.model';

@Injectable()
export class TeamsService extends BackendService {

  servicesApi = environment.servicesUrl;
  teamUrl = this.servicesApi + '/mysportteam/api/teams';

  getAllTeams(): Observable<TeamModel[]> {
    return this.get<TeamModel[]>(this.teamUrl, false);
  }

  createTeam(team: TeamModel): Observable<TeamModel> {
    return this.post<TeamModel>(this.teamUrl, null, team);
  }

  deleteTeam(id: number) {
    return this.delete(id, this.teamUrl);
  }

  editTeam(team: TeamModel): Observable<TeamModel> {
    return this.put(this.teamUrl, null, team);
  }
}
