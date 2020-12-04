import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './feature/signup/signup.component';
import { LoginComponent } from './feature/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        AngularFireAuthModule,
        ReactiveFormsModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}