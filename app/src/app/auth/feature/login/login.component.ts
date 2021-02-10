import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from '@src/app/shared/ui.service';
import { AuthService } from '@src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _loading: Subscription;
  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _uiService: UIService,
  ) { }

  ngOnInit(): void {
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
    this._authService.login({
      email: forms.value.email,
      password: forms.value.password
    })
  }
}
