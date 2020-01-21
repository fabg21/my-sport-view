import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { TeamModel } from '../../models/team.model';
import { ErrorStateMatcher } from '@angular/material';

import { BucketDestination } from 'src/app/shared/features/file-transfer/models';
import * as fromFileUpload from 'src/app/shared/features/file-transfer/store';
import { Store, select } from '@ngrx/store';
import { map, tap, filter } from 'rxjs/operators';

/** Error when invalid control is dirty, touched, or submitted. */
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  @Input()
  team: TeamModel;

  @Output() onSaveItem = new EventEmitter<any>();
  @Output() onCancelItem = new EventEmitter();

  teamForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  public BucketDestinationRef = BucketDestination;

  public imgSrc$ = this.store.pipe(
    select(fromFileUpload.selectUnOwnedFilesByUrl),
    filter(x => !!x),
    map(file => file.src)
  );

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromFileUpload.FileTransferState>
  ) {}

  ngOnInit() {
    this.createForm();
    this.initData();
  }

  initData() {
    if (!this.team) {
      this.team = {
        name: '',
        logo: ''
      };
    } else {
      this.teamForm.get('name').patchValue(this.team.name);
      this.teamForm.get('logo').patchValue(this.team.logo);
    }
  }

  createForm() {
    this.teamForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      logo: new FormControl('')
    });
  }

  get name() {
    return this.teamForm.get('name');
  }
  get logo() {
    return this.teamForm.get('logo');
  }

  saveTeam(team) {
    this.onSaveItem.emit(team);
  }

  cancel() {
    this.teamForm.reset();
    this.onCancelItem.emit();
  }
}
