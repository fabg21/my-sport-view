import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Component } from '@angular/core';

import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  public owner$: Observable<string> = this.accountService.userIdentity$.pipe(
    pluck('email')
  );

  constructor(private accountService: AccountService) {}

  logout() {
    this.accountService.logout();
  }
}
