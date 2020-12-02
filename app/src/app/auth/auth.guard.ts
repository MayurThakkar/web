import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators'
import { AuthService } from './auth.service';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
   
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _store: Store<fromRoot.State>
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: ActivatedRouteSnapshot) {
        return this._store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}