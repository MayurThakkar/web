import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NativeScriptModule } from '@nativescript/angular';
import { StoreModule } from '@ngrx/store';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateModule
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { MaterialModule } from '@src/app/material.module'
import { AuthModule } from '@src/app/auth/auth.module';

import { reducers } from '@src/app/app.reducer';

import { AppComponent } from '@src/app/app.component';
import { environment } from '@src/environments/environment';
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


// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HeaderComponent,
    MainComponent,
  ],
  imports: [
    NativeScriptModule,
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
        provide: TranslateModule,
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
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
