import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        AngularFireAuthModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class AuthModule {}