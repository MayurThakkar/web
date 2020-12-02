import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FlexLayoutModule } from '@angular/flex-layout'
import { StoreModule } from '@ngrx/store';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from '@ngx-translate/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module'
import { AuthModule } from './auth/auth.module';

import { meterReducer } from '../app/meterlist/state/meter.reducer';
import { reducers } from './app.reducer';

import { AppComponent } from './app.component';
import { MeterlistComponent } from './meterlist/feature/meterlist.component'
import { MeterComponent } from './meter/meter.component';
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header/header.component';

import { AuthService } from '../app/auth/auth.service';
import { MeterService } from './meterlist/meter.service';
import { UIService } from './shared/ui.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return 'some value';
    }
}

@NgModule({
  declarations: [
    AppComponent,
    MeterlistComponent,
    MeterComponent,
    DialogComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature('meterdata', meterReducer),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      useDefaultLang: true
    }),
  ],
  providers: [
    MeterService,
    AuthService,
    UIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
