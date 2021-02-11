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

import { environment } from '@src/environments/environment';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { MaterialModule } from '@src/app/material.module'
import { AuthModule } from '@src/app/auth/auth.module';

import { reducers } from '@src/app/app.reducer';

import { AppComponent } from '@src/app/app.component';

import { AuthService } from '@src/app/auth/auth.service';
import { UIService } from '@src/app/shared/ui.service';
import { MeterService } from '@src/app/meter/meter.service';
import { DialogComponent } from '@src/app/dialog/feature/dialog.component';
import { MainComponent } from '@src/app/main/feature/main.component';
import { HeaderComponent } from '@src/app/header/feature/header/header.component';

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
    DialogComponent,
    HeaderComponent,
    MainComponent,
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
