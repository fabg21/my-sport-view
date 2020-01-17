import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';

import { TeamModel } from '../../models/team.model';
import * as fromStore from '../../store';
import { SeasonModel } from '../../models/season.model';
import {MatchModel} from '../../models/match.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  teams$: Observable<TeamModel[]>;
  season$: Observable<SeasonModel | undefined>;
  selectedTeam: TeamModel;
  match$: Observable<MatchModel[]>;

  constructor(
    private store: Store<fromStore.ManagementState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadTeams());
    this.store.dispatch(new fromStore.LoadSeasons());
    this.teams$ = this.store.select(fromStore.getAllTeams);
  }

  selectTeam(team: TeamModel) {
    this.selectedTeam = team;
    this.season$ = this.store.select(fromStore.getAllSeasons).pipe(
      map(seasons => seasons.find(season => season.teamIdId === team.id && season.current)),
    );
  }
}
