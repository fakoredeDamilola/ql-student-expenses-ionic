// TODO implement this so you can navigate to say the login page if your already logged in
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_services';


@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        // This means your logged in, so redirect to home page
        if (account) {
          this.router.navigate(['/']);
          return true;
        }
    }
}
