import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private _router: Router) {}

    resgisterUser(auth: AuthData) {
        this.user = {
            email: auth.email,
            userId: Math.round(Math.random() * 10000).toString()
        };

        this.authSuccessfully(true, '/meter');
    }

    login(auth: AuthData) {
        this.user = {
            email: auth.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        
        this.authSuccessfully(true, '/meter');
    }

    logOut() {
        this.user = null;

        this.authSuccessfully(false, '/login');
    }

    authSuccessfully(authSuccess: boolean, path: string) {
        this.authChange.next(authSuccess);
        this._router.navigate([path]);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }
}