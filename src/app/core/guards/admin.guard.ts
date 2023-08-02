import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/core/services';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user?.role == 'admin') {
            return true;
        }

        this.router.navigate(['/product-view']);
        return false;
    }
}
