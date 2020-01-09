import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PlayerModel} from '../../models/player.model';
import {switchMap, takeWhile} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {PlayersService} from '../../services';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit, OnDestroy {

  alive = true;
  selectedId: number;
  player$: Observable<PlayerModel>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
    private router: Router,
    private playerService: PlayersService,
  ) { }

  ngOnInit() {
    this.player$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = + params.get('id');
        return this.store.pipe(
          select(fromStore.getSelectedPlayer, { id: this.selectedId })
        );
      })
    );
  }

  cancelEditItem() {
    this.router.navigateByUrl('/management/players');
  }

  editPlayer(playerData) {
    playerData.id = this.selectedId;
    playerData.avatar = 'https://api.adorable.io/avatars/285/bad@adorable.io.png';
    this.playerService.editPlayer(playerData).pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      x => {
        this.store.dispatch(new fromStore.LoadPlayers());
        this.router.navigateByUrl('/management/players');
      }
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
