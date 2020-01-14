import { differenceBy } from 'lodash';

import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {PlayerModel} from '../../models/player.model';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit {

  @Input()
  allPlayers: PlayerModel[];

  @Input()
  selectedPlayers: PlayerModel[] = [];

  availablePlayers: PlayerModel[];

  ngOnInit(): void {
    this.availablePlayers = differenceBy(this.allPlayers, this.selectedPlayers, 'id');
  }

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
