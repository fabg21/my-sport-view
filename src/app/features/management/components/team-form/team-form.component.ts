import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TeamModel } from '../../models/team.model';

import * as fromFileUpload from 'src/app/shared/features/file-upload/store';
import { Store, select } from '@ngrx/store';
import { map, filter, concatAll, concatMap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/shared/features/file-upload/services';
import { MyErrorStateMatcher } from '../../../../core/utils/my-error-state-matcher';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  public imgSrc$ = this.store$.pipe(
    select(fromFileUpload.selectFiles),
    map(Object.keys),
    filter(arr => arr.length > 0),
    concatAll(),
    concatMap(fileName => this.fileUpload.getFileUrl(fileName, 'avatars'))
  );

  @Input()
  team: TeamModel;

  @Output() onSaveItem = new EventEmitter<any>();
  @Output() onCancelItem = new EventEmitter();

  teamForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<fromFileUpload.FileUploadState>,
    private fileUpload: FileUploadService
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
