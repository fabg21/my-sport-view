import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Account } from '../models/account.model';
import { TokenModel } from '../models/token.model';
import { BackendService } from './backend.service';

@Injectable({ providedIn: 'root' })
export class AccountService extends BackendService {
  private userIdentity: Account;
  private authenticated = false;
  private authenticationState = new BehaviorSubject<Account>(null);

  public userIdentity$: Observable<Account | null> = this.authenticationState.asObservable();

  apiUrl = environment.apiUrl;
  authenticateUrl = this.apiUrl + '/authenticate';
  accountUrl = this.apiUrl + '/account';

  constructor(protected http: HttpClient, private router: Router) {
    super(http);
  }

  authenticate(login: string, password: string): Observable<TokenModel> {
    const body = {
      username: password,
      password,
      rememberMe: false
    };
    return this.post<TokenModel>(this.authenticateUrl, false, body);
  }

  fetchAccount(): Observable<Account> {
    return this.get<Account>(this.accountUrl, false);
  }

  login(login: string, password: string): Observable<Account> {
    return this.authenticate(login, password).pipe(
      flatMap(token => {
        localStorage.setItem('JWT_TOKEN', token.id_token);
        return this.fetchAccount();
      })
    );
  }

  loginAndFetchAccount(login: string, password: string): Observable<boolean> {
    return this.login(login, password).pipe(
      flatMap((account: Account) => {
        this.userIdentity = account;
        this.authenticated = account !== null;
        this.authenticationState.next(this.userIdentity);
        return of(this.authenticated);
      })
    );
  }

  fetchAccountWithJwt() {
    return this.fetchAccount().pipe(
      flatMap((account: Account) => {
        this.userIdentity = account;
        this.authenticated = account !== null;
        this.authenticationState.next(this.userIdentity);
        return of(this.authenticated);
      })
    );
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (
      !this.authenticated ||
      !this.userIdentity ||
      !this.userIdentity.authorities
    ) {
      return false;
    }

    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    if (authorities.length === 0) {
      return true;
    }

    return authorities.some((authority: string) =>
      this.userIdentity.authorities.includes(authority)
    );
  }

  getAuthenticationState(): Observable<Account> {
    return this.authenticationState.asObservable();
  }

  getAccount(): Account {
    return this.userIdentity;
  }

  logout() {
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigateByUrl('/login');
  }
}
