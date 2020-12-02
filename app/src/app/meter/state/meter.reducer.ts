import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { from } from 'rxjs';

import * as fromApp from '../../app.reducer'
import { MeterActions,
         SET_AVAILABLE_METER_DATA,
         DELETE_AVAILABLE_METER_DATA,
         ADD_AVAILABLE_METER_DATA } from '../state/meter.actions'
import { MeterList } from '../meter-list.model'

export interface MeterDataState {
    meterData: MeterList[];
    addMeterData: MeterList;
    deleteMeterData: MeterList;
}

export interface State extends fromApp.State {
    meter: MeterDataState;
}

const initialState: MeterDataState = {
    meterData: [],
    addMeterData: null,
    deleteMeterData: null,
}

/**
 * 
 * @param state old state as a input 
 * @param action incoming action to store
 */
export function meterReducer(state = initialState, action: MeterActions) {
    switch (action.type) {
        case SET_AVAILABLE_METER_DATA:
            return {
                ...state,
                meterData: action.payload
            };
        case ADD_AVAILABLE_METER_DATA:
            return {
                ...state,
                addMeterData: action.payload
            };
        case DELETE_AVAILABLE_METER_DATA:
            return {
                ...state,
                deleteMeterData: action.payload
            }         
        default:
            return state;
    }
}

export const getMeterState = createFeatureSelector<MeterDataState>('meterdata');


export const getMeterData = createSelector(getMeterState, (state: MeterDataState) => state.meterData);
export const addMeterData = createSelector(getMeterState, (state: MeterDataState) => state.addMeterData);
export const deleteMeterData = createSelector(getMeterState, (state: MeterDataState) => state.deleteMeterData);0
