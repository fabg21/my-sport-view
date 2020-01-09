import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {SeasonModel} from '../../models/season.model';
import * as fromStore from '../../store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PlayerModel} from '../../models/player.model';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit, OnDestroy {

  alive = true;
  selectedId: number;
  season$: Observable<SeasonModel>;

  allplayers$: Observable<PlayerModel[]>;
  selectedPlayers: PlayerModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
  ) { }

  ngOnInit() {
    this.season$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = + params.get('id');
        return this.store.pipe(
          select(fromStore.getSelectedSeason, { id: this.selectedId })
        );
      })
    );

    this.allplayers$ = this.store.select(fromStore.getAllPlayers);
    this.store.dispatch(new fromStore.LoadPlayers());
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

  ngOnDestroy(): void {
    this.alive = false;
  }

}
