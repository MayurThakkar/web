import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import * as Auth from './auth-state/auth.actions';
import * as fromRoot from '../app.reducer';
import { UIService } from '../shared/ui.service';
import { MeterService } from '../meter/meter.service';


@Injectable()
export class AuthService {

    constructor(
        private _router: Router,
        private _ngAuth: AngularFireAuth,
        private _meterService: MeterService,
        private _store: Store<fromRoot.State>,
        private _uiService: UIService
    ) {}

    initAuthListener() {
        this._ngAuth.authState.subscribe((user) => {
            if (user) {
                this._store.dispatch(new Auth.SetAuthenticated(user.email));
                this._router.navigate(['/']);
            } else {
                // TODO: deal with unsubscription undefined
                // this._meterService.cancelSubscription();
                this._store.dispatch(new Auth.SetUnAuthenticated());
                this._router.navigate(['/login']);
            }
        });
    }

    resgisterUser(auth: AuthData) {
        this._uiService.loadingStateChanged.next(true);
            
        this._ngAuth.createUserWithEmailAndPassword(
            auth.email,
            auth.password
        )
        .then(() => 
            this._uiService.loadingStateChanged.next(false)
        )
        .catch((error) => {
            this._uiService.loadingStateChanged.next(false);
            this._uiService.showSnackBar(error.message, null, {
                duration: 3000
            });
        });
    }

    login(auth: AuthData) {
        this._uiService.loadingStateChanged.next(true);

        this._ngAuth.signInWithEmailAndPassword(
            auth.email,
            auth.password
        )
        .then(() => 
            this._uiService.loadingStateChanged.next(false)
        )
        .catch((error) => {
            this._uiService.loadingStateChanged.next(false);
            this._uiService.showSnackBar(error.message, null, {
                duration: 3000
            });
        });
    }

    logOut() {
        this._ngAuth.signOut();
    }
}