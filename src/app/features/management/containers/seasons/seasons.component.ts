import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PlayerModel} from '../../models/player.model';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Router} from '@angular/router';
import {PlayersService} from '../../services';
import {takeWhile} from 'rxjs/operators';
import {SeasonModel} from '../../models/season.model';
import {TeamModel} from '../../models/team.model';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  seasons$: Observable<SeasonModel[]>;
  teams$: Observable<TeamModel[]>;

  alive = true;

  constructor(
    private store: Store<fromStore.ManagementState>,
    private router: Router,
    private playerService: PlayersService
  ) { }

  ngOnInit() {
    this.seasons$ = this.store.select(fromStore.getAllSeasons);
    this.store.dispatch(new fromStore.LoadSeasons());
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.store.dispatch(new fromStore.LoadTeams());
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  newSeason() {
    this.router.navigateByUrl('/management/create-season');
  }
}
