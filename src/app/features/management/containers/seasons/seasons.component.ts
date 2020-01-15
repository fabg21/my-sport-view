import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as fromStore from '../../store';
import { SeasonModel } from '../../models/season.model';
import { TeamModel } from '../../models/team.model';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  seasons$: Observable<SeasonModel[]>;
  teams$: Observable<TeamModel[]>;

  constructor(
    private store: Store<fromStore.ManagementState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.seasons$ = this.store.select(fromStore.getAllSeasons);
    this.store.dispatch(new fromStore.LoadSeasons());
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.store.dispatch(new fromStore.LoadTeams());
  }

  newSeason() {
    this.router.navigateByUrl('/management/create-season');
  }

  configureSeason(seasonId) {
    this.store.dispatch(new fromStore.SelectOneSeason({id: seasonId}));
    this.router.navigateByUrl('/management/season');
  }
}
