import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'keez-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'keez-web-app';
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'nl']);

    const preferredLanguage = this.preferredLanguage();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(preferredLanguage);
  }

  private preferredLanguage(): string {
    const languageSetting = localStorage.getItem('language');
    if (languageSetting) {
      const languageIndex = this.translate.langs.indexOf(languageSetting);
      if (languageIndex >= 0) {
        return languageSetting;
      }
    }

    let browserLanguage = this.translate.langs[0];
    window.navigator.languages.some((val) => {
      const languageIndex = this.translate.langs.indexOf(val);
      if (languageIndex >= 0) {
        browserLanguage = val;
        return true;
      }
    });

    return browserLanguage;
  }
}
