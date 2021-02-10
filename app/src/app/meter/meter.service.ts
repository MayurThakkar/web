import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromMeter from './state/meter.reducer'
import * as Meter from './state/meter.actions'
import { IDataDTO } from 'src/Backend/DataDTO';
import { Subscription } from 'rxjs'

@Injectable()
export class MeterService {
  private _fireSubscription: Subscription;
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
    const id = this.db.createId();
    const item: IDataDTO = { id, ...newData};
    this.db.collection('meterData').add(item);
  }

  updateData(data: IDataDTO) {
    console.log("data db", this.db.collection('meterData').doc(data.id));
    this.db.collection('meterData').doc(data.id).update(data);
  }

  deleteMeterData(data: IDataDTO) {
    console.error("delete", data);
    this.db.collection('meterData').doc(data.id).delete();
  }

  cancelSubscription() {
    this._fireSubscription.unsubscribe();
  }
}