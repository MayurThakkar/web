import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { MeterService } from '../meterlist/meter.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();

    private _isAuthenticated = false;

    constructor(
        private _router: Router,
        private _ngAuth: AngularFireAuth,
        private _meterService: MeterService
    ) {}

    initAuthListener() {
        this._ngAuth.authState.subscribe((user) => {
            if (user) {
                this._isAuthenticated = true;
                this.authChange.next(true);
                this._router.navigate(['/meter']);
            } else {
                // TODO: deal with unsubscription undefined
                // this._meterService.cancelSubscription();
                this.authChange.next(false);
                this._router.navigate(['/login']);
                this._isAuthenticated = false;
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

    isAuth() {
        return this._isAuthenticated;
    }
}