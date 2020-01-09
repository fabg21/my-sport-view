import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SeasonModel} from '../../models/season.model';
import {ErrorStateMatcher} from '@angular/material';

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
export class SeasonFormComponent implements OnInit {

  @Input()
  season: SeasonModel;

  @Output() saveItem = new EventEmitter<any>();
  @Output() cancelItem = new EventEmitter();

  seasonForm: FormGroup;
  matcher = new MyErrorStateMatcher();

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
        debut: null,
        fin: null
      };
    } else {
      this.seasonForm.get('start').patchValue(new Date(this.season.debut));
      this.seasonForm.get('end').patchValue(new Date(this.season.fin));
    }
  }

  createForm() {
    this.seasonForm = this.formBuilder.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    });
  }

  get start() { return this.seasonForm.get('start'); }
  get end() { return this.seasonForm.get('end'); }

  saveSeason(season) {
    this.saveItem.emit(season);
  }

  cancel() {
    this.seasonForm.reset();
    this.cancelItem.emit();
  }
}
