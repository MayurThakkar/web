import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { MeterlistComponent } from './feature/meter-list/meterlist.component';
import { MeterComponent } from './feature/meter/meter.component';
import { MeterRoutingModule } from './meter-routing.module';
import { meterReducer } from './state/meter.reducer';

@NgModule({
    declarations: [
        MeterlistComponent,
        MeterComponent,
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('meterdata', meterReducer),
        MeterRoutingModule
    ]
})
export class MeterModule {}