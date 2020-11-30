import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private _translate: TranslateService,
    private _authService: AuthService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      _translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      _translate.use('en');
   }

  ngOnInit(): void {
    this.authSubscription = this._authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    })

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  languages = [
    { value: 'en', label: 'app.language.en' },
    { value: 'de', label: 'app.language.de' },
  ]

  selectLanguage(lang: string) {
    this._translate.use(lang);
  }

  onLogout() {
    this._authService.logOut();
  }
}
