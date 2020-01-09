import {Observable} from 'rxjs';
import {ObservableInput} from 'observable-input/lib';

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {PlayerModel} from '../../models/player.model';
import {listAnimation} from '../../../common/utils/animation';

@Component({
  selector: 'app-player-list-display',
  templateUrl: './player-list-display.component.html',
  styleUrls: ['./player-list-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: listAnimation.funky('list', 'item')
})
export class PlayerListDisplayComponent {
  @Input()
  @ObservableInput()
  players$: Observable<PlayerModel[]>

  @Output()
  onDelete = new EventEmitter();

  @Output()
  onModify = new EventEmitter<any>();

  delete(id) {
    this.onDelete.emit(id);
  }

  modify(player: PlayerModel) {
    this.onModify.emit(player);
  }

  trackById(index: number, player: PlayerModel) {
    return player.id || null;
  }
}
