import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromMeter from './state/meter.reducer'
import * as Meter from './state/meter.actions'
import { IDataDTO } from 'src/Backend/DataDTO';

@Injectable()
export class MeterService {
  constructor(private db: AngularFirestore,
              private store: Store<fromMeter.MeterDataState>) {}

  getMeterList() {
    this.db.collection('meterData')
            .valueChanges()
            .subscribe((data: IDataDTO[]) => {
                this.store.dispatch(new Meter.SetMeterData(data));
    });
  }

  addNewMeterData(newData: IDataDTO) {
    this.db.collection('meterData').add(newData);
  }

  deleteMeterData(data: IDataDTO) {
    this.db.collection('meterData').doc(data.name).delete();
  }

}