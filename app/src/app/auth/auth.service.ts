import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { MeterService } from '../meterlist/meter.service';
import * as Auth from './auth-state/auth.actions';
import * as fromRoot from '../app.reducer';


@Injectable()
export class AuthService {

    constructor(
        private _router: Router,
        private _ngAuth: AngularFireAuth,
        private _meterService: MeterService,
        private _store: Store<fromRoot.State>
    ) {}

    initAuthListener() {
        this._ngAuth.authState.subscribe((user) => {
            if (user) {
                this._store.dispatch(new Auth.SetAuthenticated());
                this._router.navigate(['/meter']);
            } else {
                // TODO: deal with unsubscription undefined
                // this._meterService.cancelSubscription();
                this._store.dispatch(new Auth.SetUnAuthenticated());
                this._router.navigate(['/login']);
            }
        });
    }

    resgisterUser(auth: AuthData) {
        this._ngAuth.createUserWithEmailAndPassword(
            auth.email,
            auth.password
        )
        .catch((error) => {
            console.error("auth error", error);
        });
    }

    login(auth: AuthData) {
        console.error("called login");
        this._ngAuth.signInWithEmailAndPassword(
            auth.email,
            auth.password
        )
        .catch((error) => {
            console.error("auth error", error);
        });
    }

    logOut() {
        this._ngAuth.signOut();
    }
}