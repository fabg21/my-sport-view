import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { PlayerModel } from '../../models/player.model';
import {MyErrorStateMatcher} from '../../../../core/utils/my-error-state-matcher';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit, OnDestroy {

  @Input()
  player: PlayerModel;

  @Output() onSaveItem = new EventEmitter<any>();
  @Output() onCancelItem = new EventEmitter();

  alive = true;
  createPlayerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.initData();
  }

  initData() {
    if (!this.player) {
      this.player = {
        firstname: '',
        lastname: '',
        dateOfBirth: null,
        email: '',
        phone: '',
        address: ''
      };
    } else {
      this.createPlayerForm.get('firstname').patchValue(this.player.firstname);
      this.createPlayerForm.get('lastname').patchValue(this.player.lastname);
      this.createPlayerForm.get('dateOfBirth').patchValue(this.player.dateOfBirth);
      this.createPlayerForm.get('email').patchValue(this.player.email);
      this.createPlayerForm.get('phone').patchValue(this.player.phone);
      this.createPlayerForm.get('address').patchValue(this.player.address);
      // this.createPlayerForm.get('avatar').patchValue(this.player.avatar);
    }
  }

  createForm() {
    this.createPlayerForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  get firstname() { return this.createPlayerForm.get('firstname'); }
  get lastname() { return this.createPlayerForm.get('lastname'); }
  get dateOfBirth() { return this.createPlayerForm.get('dateOfBirth'); }
  get email() { return this.createPlayerForm.get('email'); }
  get phone() { return this.createPlayerForm.get('phone'); }
  get address() { return this.createPlayerForm.get('address'); }

  savePlayer(playerData) {
    this.onSaveItem.emit(playerData);
  }

  cancel() {
    this.createPlayerForm.reset();
    this.onCancelItem.emit();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
