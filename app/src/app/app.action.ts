import { Action } from '@ngrx/store';

export const START_ACTIVE = '[UI] Start active';
export const STOP_ACTIVE = '[UI] Stop active';

export class MeterData implements Action {
    readonly type = START_ACTIVE;
}

export class MeterData1 implements Action {
    readonly type = STOP_ACTIVE;
}

export type UIActions = MeterData | MeterData1;