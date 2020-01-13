import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { PlayerModel } from '../models/player.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PlayersService extends BackendService {
  servicesApi = environment.servicesUrl;
  playerUrl = this.servicesApi + '/mysportteam/api/players';

  getAllPlayers(): Observable<PlayerModel[]> {
    return this.get<PlayerModel[]>(this.playerUrl, false);
  }

  createPlayer(player: PlayerModel): Observable<PlayerModel> {
    return this.post<PlayerModel>(this.playerUrl, null, player);
  }

  deletePlayer(id: number) {
    return this.delete(id, this.playerUrl);
  }

  editPlayer(player: PlayerModel): Observable<PlayerModel> {
    return this.put(this.playerUrl, null, player);
  }
}
