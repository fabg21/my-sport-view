import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {SeasonModel} from '../../models/season.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit, OnDestroy {

  alive = true;
  selectedId: number;
  season$: Observable<SeasonModel>;

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
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
