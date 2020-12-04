import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './main/feature/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'meter', loadChildren: () => import('./meter/meter.module').then(m => m.MeterModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }