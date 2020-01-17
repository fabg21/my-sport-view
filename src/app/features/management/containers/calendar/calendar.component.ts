import { Observable } from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';

import { TeamModel } from '../../models/team.model';
import * as fromStore from '../../store';
import { SeasonModel } from '../../models/season.model';
import { CalendarModel } from '../../models/calendar.model';
import {temporaryAllocator} from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  teams$: Observable<TeamModel[]>;
  season$: Observable<SeasonModel | undefined>;
  calendars$: Observable<CalendarModel[]>;
  calendar$: Observable<CalendarModel>;
  selectedTeam: TeamModel;

  constructor(
    private store: Store<fromStore.ManagementState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadTeams());
    this.store.dispatch(new fromStore.LoadSeasons());
    this.store.dispatch(new fromStore.LoadCalendars());
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.calendars$ = this.store.select(fromStore.getAllCalendars);
  }

  selectTeam(teamSelected) {
    this.selectedTeam = teamSelected.value;
    this.season$ = this.store.select(fromStore.getAllSeasons).pipe(
      map(seasons => seasons.find(season => season.teamIdId === teamSelected.value.id && season.current)),
      filter(season => !!season),
      tap(season => this.store.dispatch(new fromStore.LoadCalendarFromSeason({seasonId: season.id})))
    );

    this.calendar$ = this.season$.pipe(
      filter(season => !!season),
      switchMap(season => this.store.select(fromStore.getCalendarFromSeason(season.id))),
    );
  }
}
