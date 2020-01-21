import { Observable } from 'rxjs';
import { ObservableInput } from 'observable-input/lib';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { SeasonModel } from '../../models/season.model';
import { TeamModel } from '../../models/team.model';
import { PlayerModel } from '../../models/player.model';
import { MyErrorStateMatcher } from '../../../../core/utils/my-error-state-matcher';

@Component({
  selector: 'app-season-form',
  templateUrl: './season-form.component.html',
  styleUrls: ['./season-form.component.scss']
})
export class SeasonFormComponent implements OnInit, OnDestroy {
  color = 'accent';

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
        current: false,
        players: []
      };
    } else {
      this.seasonForm.get('start').patchValue(new Date(this.season.start));
      this.seasonForm.get('end').patchValue(new Date(this.season.end));
      this.seasonForm.get('teamIdId').patchValue(this.season.teamIdId);
      this.seasonForm.get('current').patchValue(this.season.current);
      this.seasonForm.get('teamIdId').disable();
      this.selectedPlayers = Object.assign([], this.season.players);
    }
  }

  createForm() {
    this.seasonForm = this.formBuilder.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      teamIdId: new FormControl('', Validators.required),
      current: new FormControl('', Validators.required),
    });
  }

  get start() { return this.seasonForm.get('start'); }
  get end() { return this.seasonForm.get('end'); }
  get teamIdId() { return this.seasonForm.get('teamIdId'); }
  get current() { return this.seasonForm.get('current'); }

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
