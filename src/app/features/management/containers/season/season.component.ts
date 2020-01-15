import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SeasonModel} from '../../models/season.model';
import * as fromStore from '../../store';
import { PlayerModel } from '../../models/player.model';
import {TeamModel} from '../../models/team.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {

  season$: Observable<SeasonModel>;

  allPlayers$: Observable<PlayerModel[]>;
  teams$: Observable<TeamModel[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.season$ = this.store.pipe(
      select(fromStore.getSelectedSeason),
      tap(x => console.log('FMN ngOnInit ', x))
    );
    this.allPlayers$ = this.store.select(fromStore.getAllPlayers);
    this.store.dispatch(new fromStore.LoadPlayers());
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.store.dispatch(new fromStore.LoadTeams());
  }

  cancel() {
    this.router.navigateByUrl('/management/seasons');
  }

  editSeason(seasonData) {
    this.store.dispatch(new fromStore.EditSeason({seasonData}));
  }
}
