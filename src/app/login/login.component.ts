import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AccountService} from '../common/service/account.service';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private accountService: AccountService, private router: Router) { }

  authenticate() {
    this.accountService.loginAndFetchAccount(this.loginFormControl.value, this.passwordFormControl.value).subscribe(
      account => this.router.navigate(['/'])
    );
  }
}
