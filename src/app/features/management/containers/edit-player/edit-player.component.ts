import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PlayerModel} from '../../models/player.model';
import * as fromStore from '../../store';
import { PlayersService } from '../../services';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  player$: Observable<PlayerModel>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.player$ = this.store.pipe(
      select(fromStore.getSelectedPlayer),
    );
  }

  cancelEditItem() {
    this.router.navigateByUrl('/management/players');
  }

  editPlayer(playerData) {
    this.store.dispatch(new fromStore.EditPlayer({playerData}));
  }
}
