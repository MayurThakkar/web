import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { AuthService } from '@src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(
    private _translate: TranslateService,
    private _authService: AuthService,
    private _store: Store<fromRoot.State>
  ) {
      // this language will be used as a fallback when a translation isn't found in the current language
      _translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      _translate.use('en');
   }

  ngOnInit(): void {
    this.userName$ = this._store.select(fromRoot.getUser);
    this.isAuth$ = this._store.select(fromRoot.getIsAuth);
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
