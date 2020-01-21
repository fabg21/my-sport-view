import { Observable } from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { split, head, last } from 'lodash';

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { OpposingTeamModel } from '../../models/opposingTeam.model';
import * as fromStore from '../../store';
import { MyErrorStateMatcher } from '../../../../core/utils/my-error-state-matcher';
import { MatchModel } from '../../models/match.model';
import { CalendarModel } from '../../models/calendar.model';

@Component({
  selector: 'app-create-match-form',
  templateUrl: './create-match-form.component.html',
  styleUrls: ['./create-match-form.component.scss']
})
export class CreateMatchFormComponent implements OnInit, OnDestroy {

  @Output() closeDrawer = new EventEmitter();

  alive = true;
  createMatchForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  types = [
    'CHAMPIONSHIP', 'CUP', 'FRIENDSHIP'
  ];
  opponents$: Observable<OpposingTeamModel[]>;
  calendar: CalendarModel;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromStore.ManagementState>,
  ) { }

  ngOnInit() {
    this.createForm();
    this.store.select(fromStore.getSelectedCalendar).pipe(
      takeWhile(() => this.alive),
    ).subscribe(calendar => {
      this.calendar =  calendar;
    });
    this.opponents$ = this.store.select(fromStore.getAllOpposingTeams);
  }

  createForm() {
    this.createMatchForm = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      opponentId: new FormControl('', Validators.required),
      startTime: new FormControl('20:30'),
      appointmentHour: new FormControl('20:00')
    });
  }

  get date() { return this.createMatchForm.get('date'); }
  get type() { return this.createMatchForm.get('type'); }
  get place() { return this.createMatchForm.get('place'); }
  get opponentId() { return this.createMatchForm.get('opponentId'); }
  get startTime() { return this.createMatchForm.get('startTime'); }
  get appointmentHour() { return this.createMatchForm.get('appointmentHour'); }

  createMatch(matchData) {
    const appointmentHourTemp = new Date(matchData.date);
    appointmentHourTemp.setHours(head(split(matchData.appointmentHour, ':')));
    appointmentHourTemp.setMinutes(last(split(matchData.appointmentHour, ':')));
    const startTimeTemp = new Date(matchData.date);
    startTimeTemp.setHours(head(split(matchData.startTime, ':')));
    startTimeTemp.setMinutes(last(split(matchData.startTime, ':')));
    const matchToSave: MatchModel =  {
      ...matchData,
      calendarId: this.calendar.id,
      appointmentHour: appointmentHourTemp,
      startTime: startTimeTemp
    };
    this.store.dispatch(new fromStore.AddMatchToCalendar({match: matchToSave}));
    this.createMatchForm.reset();
    this.closeDrawer.emit();
  }

  cancel() {
    this.createMatchForm.reset();
    this.closeDrawer.emit();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
