import {
    AuthActions,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED
} from './auth.actions';

const DEFAULT_USER = '';

export interface AuthState {
    isAuthenticated: boolean,
    userName: string
}

const initialState: AuthState = {
     isAuthenticated: false,
     userName: DEFAULT_USER
}

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true,
                userName: action.payload
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false,
                userName: DEFAULT_USER
            };      
        default:
            return state;
    }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated;
export const getUser = (state: AuthState) => state.userName;