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
export class CreatePlayerComponent implements OnDestroy {

  alive = true;

  constructor(
    private router: Router,
    private playerService: PlayersService,
    private store: Store<fromStore.ManagementState>
  ) {}

  cancelCreateItem() {
    this.router.navigateByUrl('/management/players');
  }

  createPlayer(playerData) {
    playerData.avatar = 'https://api.adorable.io/avatars/285/bad@adorable.io.png';
    this.playerService.createPlayer(playerData).pipe(
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
