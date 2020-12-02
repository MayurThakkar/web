import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private _snackBar: MatSnackBar){}

    showSnackBar(message: string, action, duration) {
        this._snackBar.open(message, action, duration);
    }
}