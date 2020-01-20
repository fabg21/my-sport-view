import { Observable } from 'rxjs';
import {filter, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatBottomSheet } from '@angular/material';

import { TeamModel } from '../../models/team.model';
import * as fromStore from '../../store';
import { SeasonModel } from '../../models/season.model';
import { CalendarModel } from '../../models/calendar.model';
import { OpposingTeamModel } from '../../models/opposingTeam.model';
import { CalendarsService } from '../../services';
import { CreateMatchFormComponent } from '../../containers/create-match-form/create-match-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  teams$: Observable<TeamModel[]>;
  season$: Observable<SeasonModel | undefined>;
  calendars$: Observable<CalendarModel[]>;
  calendar$: Observable<CalendarModel>;
  selectedTeam: TeamModel;
  opposingTeams: {id: number, value: OpposingTeamModel};

  alive = true;

  constructor(
    private store: Store<fromStore.ManagementState>,
    private calendarsService: CalendarsService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadTeams());
    this.store.dispatch(new fromStore.LoadSeasons());
    this.store.dispatch(new fromStore.LoadCalendars());
    this.store.dispatch(new fromStore.LoadOpposingTeams());
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.calendars$ = this.store.select(fromStore.getAllCalendars);
    this.store.select(fromStore.getAllOpposingTeams).pipe(
      takeWhile(() => this.alive),
    ).subscribe(
      opposingTeams => this.opposingTeams = Object.assign({}, ...opposingTeams.map(s => ({[s.id]: s.name})))
    );
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
      map(calendar => this.calendarsService.mapCalendarWithNextMatches(calendar))
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  addNextMatch() {
    this.bottomSheet.open(CreateMatchFormComponent);
  }
}
