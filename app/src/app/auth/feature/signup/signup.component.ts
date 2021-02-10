import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from '@src/app/shared/ui.service';
import { AuthService } from '@src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  private _loading: Subscription;
  isLoading = false;
  maxDate: Date;
  

  constructor(
    private _authService: AuthService,
    private _uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this._loading = this._uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    if (this._loading) {
      this._loading.unsubscribe();
    }
  }

  onSubmit(forms: NgForm) {
    console.error(forms);
    this._authService.resgisterUser({
      email: forms.value.email,
      password: forms.value.password
    })
  }
}
