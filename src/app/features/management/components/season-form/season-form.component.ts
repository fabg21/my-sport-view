import {Observable} from 'rxjs';
import {ObservableInput} from 'observable-input/lib';

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

import {SeasonModel} from '../../models/season.model';
import {TeamModel} from '../../models/team.model';
import {PlayerModel} from '../../models/player.model';
import {filter, map, tap} from 'rxjs/operators';

/** Error when invalid control is dirty, touched, or submitted. */
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-season-form',
  templateUrl: './season-form.component.html',
  styleUrls: ['./season-form.component.scss']
})
export class SeasonFormComponent implements OnInit, OnDestroy {

  @Input()
  season: SeasonModel;

  @Input()
  @ObservableInput()
  teams$: Observable<TeamModel[]>;

  @Input()
  @ObservableInput()
  allPlayers$: Observable<PlayerModel[]>;

  @Output() saveItem = new EventEmitter<any>();
  @Output() cancelItem = new EventEmitter();

  alive = true;
  seasonForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  selectedPlayers: PlayerModel[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.initData();
  }

  initData() {
    if (!this.season) {
      this.season = {
        start: null,
        end: null,
        teamIdId: null,
        players: []
      };
    } else {
      this.seasonForm.get('start').patchValue(new Date(this.season.start));
      this.seasonForm.get('end').patchValue(new Date(this.season.end));
      this.seasonForm.get('teamIdId').patchValue(this.season.teamIdId);
      this.seasonForm.get('teamIdId').disable();
      this.selectedPlayers = Object.assign([], this.season.players);
    }
  }

  createForm() {
    this.seasonForm = this.formBuilder.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      teamIdId: new FormControl('', Validators.required)
    });
  }

  get start() { return this.seasonForm.get('start'); }
  get end() { return this.seasonForm.get('end'); }
  get teamIdId() { return this.seasonForm.get('teamIdId'); }

  saveSeason(season) {
    const seasonToSave = {
      ...season,
      teamIdId: this.seasonForm.get('teamIdId').value,
      players: Object.assign([], this.selectedPlayers)
    }
    this.saveItem.emit(seasonToSave);
  }

  cancel() {
    this.seasonForm.reset();
    this.cancelItem.emit();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
