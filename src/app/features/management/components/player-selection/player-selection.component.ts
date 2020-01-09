import { Observable } from 'rxjs';
import { ObservableInput } from 'observable-input/lib';

import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { PlayerModel } from '../../models/player.model';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent {

  @Input()
  @ObservableInput()
  allPlayers$: Observable<PlayerModel[]>;

  @Input()
  selectedPlayers: PlayerModel[] = [];

  drop(event: CdkDragDrop<PlayerModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
