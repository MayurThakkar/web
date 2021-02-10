import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { MainComponent } from './main/feature/main.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  {
    path: 'meter',
    loadChildren: () => import('./meter/meter.module').then(m => m.MeterModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
