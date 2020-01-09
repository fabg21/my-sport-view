import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AccountService} from '../service/account.service';

@Injectable()
export class AuthGuard implements CanActivate {

  autorityKey = 'authorities';

  constructor(
    @Inject(Router) private router: Router | any,
    private accountService: AccountService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const token = localStorage.getItem('JWT_TOKEN');
    const authorities = route.data[this.autorityKey];
    return token ? this.checkAuthorities(authorities) : this.goToLogin();
  }

  checkAuthorities(authorities: string[]): Observable<boolean> {
    const account = this.accountService.getAccount();
    if (account) {
      return this.checkAuthoritiesWithAccount(authorities);
    } else {
      return this.accountService.fetchAccountWithJwt().pipe(
        map(() => {
          const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
          if (hasAnyAuthority) {
            return true;
          }
          this.router.navigate(['access-denied']);
          return false;
        })
      );
    }
  }

  checkAuthoritiesWithAccount(authorities: string[]): Observable<boolean> {
    const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
    if (hasAnyAuthority) {
      return of(true);
    }
    this.router.navigate(['access-denied']);
    return of(false);
  }

  private goToLogin(): Observable<boolean> {
    this.router.navigate(['/login']);
    return of(false);
  }
}
