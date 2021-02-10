import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '../app/auth/auth-state/auth.reducer'

export interface State {
    ui: null;
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
    ui: null,
    auth: fromAuth.authReducer,
}

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getUser = createSelector(getAuthState, fromAuth.getUser);
