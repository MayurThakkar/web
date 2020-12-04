import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MeterComponent } from './feature/meter/meter.component';

const routes: Routes = [
  { path: '', component: MeterComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class MeterRoutingModule {}