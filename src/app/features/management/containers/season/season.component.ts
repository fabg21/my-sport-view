import { Observable } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SeasonModel} from '../../models/season.model';
import * as fromStore from '../../store';
import { PlayerModel } from '../../models/player.model';
import {SeasonsService} from '../../services';
import {TeamModel} from '../../models/team.model';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit, OnDestroy {

  alive = true;
  selectedId: number;
  season$: Observable<SeasonModel>;

  allPlayers$: Observable<PlayerModel[]>;
  selectedPlayers: PlayerModel[] = [];
  teams$: Observable<TeamModel[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
    private router: Router,
    private seasonService: SeasonsService
  ) { }

  ngOnInit() {
    this.season$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = + params.get('id');
        return this.store.pipe(
          select(fromStore.getSelectedSeason, { id: this.selectedId })
        );
      })
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
    seasonData.id = this.selectedId;
    this.seasonService.editSeason(seasonData).pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      x => {
        this.store.dispatch(new fromStore.LoadSeasons());
        this.router.navigateByUrl('/management/seasons');
      }
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
