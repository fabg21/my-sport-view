import {Component, EventEmitter, Input, Output} from '@angular/core';

import { PlayerModel } from '../../models/player.model';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss']
})
export class PlayerItemComponent {
  @Input()
  player: PlayerModel;

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
}
