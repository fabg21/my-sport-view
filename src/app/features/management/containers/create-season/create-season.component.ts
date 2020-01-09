import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SeasonsService } from '../../services';
import * as fromStore from '../../store';
import { PlayerModel } from '../../models/player.model';

@Component({
  selector: 'app-create-season',
  templateUrl: './create-season.component.html',
  styleUrls: ['./create-season.component.scss']
})
export class CreateSeasonComponent implements OnInit, OnDestroy {

  alive = true;

  allPlayers$: Observable<PlayerModel[]>;
  selectedPlayers: PlayerModel[] = [];

  constructor(
    private router: Router,
    private seasonService: SeasonsService,
    private store: Store<fromStore.ManagementState>
  ) {}

  ngOnInit() {
    this.allPlayers$ = this.store.select(fromStore.getAllPlayers);
    this.store.dispatch(new fromStore.LoadPlayers());
  }

  cancel() {
    this.router.navigateByUrl('/management/seasons');
  }

  createSeason(seasonData) {
    this.seasonService.createSeason(seasonData).pipe(
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
