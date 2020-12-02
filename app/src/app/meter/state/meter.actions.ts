import { Action } from '@ngrx/store';
import { IDataDTO } from 'src/Backend/DataDTO';

export const SET_AVAILABLE_METER_DATA = '[Meter] Set Meter data';
export const ADD_AVAILABLE_METER_DATA = '[Meter] Add Meter data';
export const DELETE_AVAILABLE_METER_DATA = '[Meter] Delete Meter data';
// export const STOP_ACTIVE = '[UI] Stop active'; 

export class SetMeterData implements Action {
    readonly type = SET_AVAILABLE_METER_DATA;
    constructor(public payload: IDataDTO[]) {}
}

export class AddMeterData implements Action {
    readonly type = ADD_AVAILABLE_METER_DATA;
    constructor(public payload: IDataDTO) {}
}

export class DeleteMeterData implements Action {
    readonly type = DELETE_AVAILABLE_METER_DATA;
    constructor(public payload: IDataDTO) {}
}

export type MeterActions = SetMeterData | AddMeterData | DeleteMeterData;