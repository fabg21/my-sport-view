import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ErrorStateMatcher, MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import {OpposingTeamModel} from '../../models/opposingTeam.model';
import * as fromStore from '../../store';

/** Error when invalid control is dirty, touched, or submitted. */
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-match-form',
  templateUrl: './create-match-form.component.html',
  styleUrls: ['./create-match-form.component.scss']
})
export class CreateMatchFormComponent implements OnInit {

  createMatchForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  types = [
    'CHAMPIONSHIP', 'CUP', 'FRIENDSHIP'
  ]

  opponents$: Observable<OpposingTeamModel[]>;

  @Output() createMatchEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<CreateMatchFormComponent>,
    private store: Store<fromStore.ManagementState>,
  ) { }

  ngOnInit() {
    this.createForm();
    this.opponents$ = this.store.select(fromStore.getAllOpposingTeams);
  }

  createForm() {
    this.createMatchForm = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      opponent: new FormControl('', Validators.required),
    });
  }

  get date() { return this.createMatchForm.get('date'); }
  get type() { return this.createMatchForm.get('type'); }
  get place() { return this.createMatchForm.get('place'); }
  get opponent() { return this.createMatchForm.get('opponent'); }

  createMatch(matchData) {
    this.createMatchEvent.emit(matchData);
  }

  cancel() {
    this.createMatchForm.reset();
    this.cancelEvent.emit();
  }
}
