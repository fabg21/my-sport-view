import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import * as fromStore from '../../store';
import {PlayersService} from '../../services';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent {

  constructor(
    private router: Router,
    private store: Store<fromStore.ManagementState>
  ) {}

  cancelCreateItem() {
    this.router.navigateByUrl('/management/players');
  }

  createPlayer(playerData) {
    playerData.avatar = 'https://api.adorable.io/avatars/285/bad@adorable.io.png';
    this.store.dispatch(new fromStore.AddPlayer({playerData}));
  }
}
