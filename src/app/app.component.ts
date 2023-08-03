import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/services';
import { User } from './core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    user?: User | null;
    appLanguage: string = 'en';
    constructor(private accountService: AccountService, private translate: TranslateService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
  ngOnInit(): void {
    this.translate.setDefaultLang(this.appLanguage);
    this.translate.use(this.appLanguage);
    }
    useLanguage(language: string): void {
      this.translate.use(language);
      this.appLanguage = language;
  }
    logout() {
        this.accountService.logout();
    }
}
