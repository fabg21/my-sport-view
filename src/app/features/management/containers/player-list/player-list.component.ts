import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {PlayerModel} from '../../models/player.model';
import {Router} from '@angular/router';
import {PlayersService} from '../../services';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit, OnDestroy {

  players$: Observable<PlayerModel[]>;
  alive = true;

  constructor(
    private store: Store<fromStore.ManagementState>,
    private router: Router,
    private playerService: PlayersService
  ) { }

  ngOnInit() {
    this.players$ = this.store.select(fromStore.getAllPlayers);
    this.store.dispatch(new fromStore.LoadPlayers());
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  createPlayer() {
    this.router.navigateByUrl('/management/create-player');
  }

  delete(id) {
    this.store.dispatch(new fromStore.DeletePlayer({ id }));
    // this.playerService.deletePlayer(id).pipe(
    //   takeWhile(() => this.alive),
    // ).subscribe(x => this.store.dispatch(new fromStore.LoadPlayers()));
  }

  modify(player: PlayerModel) {
    this.store.dispatch(new fromStore.SelectOnePlayer({ id: player.id }));
    this.router.navigate(['/management/edit-player']);
  }
}
