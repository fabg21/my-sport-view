import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SeasonsService } from '../../services';
import * as fromStore from '../../store';
import { PlayerModel } from '../../models/player.model';
import {TeamModel} from '../../models/team.model';

@Component({
  selector: 'app-create-season',
  templateUrl: './create-season.component.html',
  styleUrls: ['./create-season.component.scss']
})
export class CreateSeasonComponent implements OnInit {

  teams$: Observable<TeamModel[]>;
  allPlayers$: Observable<PlayerModel[]>;

  constructor(
    private router: Router,
    private seasonService: SeasonsService,
    private store: Store<fromStore.ManagementState>
  ) {}

  ngOnInit() {
    this.allPlayers$ = this.store.select(fromStore.getAllPlayers);
    this.store.dispatch(new fromStore.LoadPlayers());
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.store.dispatch(new fromStore.LoadTeams());
  }

  cancel() {
    this.router.navigateByUrl('/management/seasons');
  }

  createSeason(seasonData) {
    this.store.dispatch(new fromStore.AddSeason({seasonData}));
  }
}
